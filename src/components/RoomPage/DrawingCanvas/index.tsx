"use client";
import { useDispatchHook, useTypedSelector } from "@/hooks/useRedux";

import { socket } from "@/utils/socket";
import { useEffect, useRef, useState, useMemo } from "react";
import WordToDraw from "./WordToDraw";
import { useGame } from "@/hooks/useGame";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import ProgressBar from "./ProgressBar";

export default function DrawingCanvas() {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);

  const { currentPlayer, currentRoom } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  const checkElementsAreEqual = (
    serverElements: readonly ExcalidrawElement[]
  ) => {
    if (excalidrawRef.current) {
      const currentElementsString = excalidrawRef.current.getSceneElements();

      return (
        JSON.stringify(currentElementsString) === JSON.stringify(serverElements)
      );
    }

    return false;
  };

  useEffect(() => {
    if (!currentPlayer.isPlayerTurn) {
      socket.on(
        "update-canvas-state",
        (excalidrawElements: ExcalidrawElement[]) => {
          // everytime the updateScene is triggered, it will trigger the onChange event
          // so we need to check if the elements are equal to avoid infinite loop
          if (!checkElementsAreEqual(excalidrawElements)) {
            excalidrawRef.current?.updateScene({
              elements: excalidrawElements,
            });
          }
        }
      );
    }
    return () => {
      socket.off("update-canvas-state");
    };
  }, [currentPlayer.isPlayerTurn, currentRoom.players]);

  const onChange = (excalidrawElements: readonly ExcalidrawElement[]) => {
    socket.emit("player-draw", {
      roomName: currentRoom.name,
      excalidrawElements,
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <WordToDraw />
      <div
        ref={containerRef}
        className="flex h-[90%] w-full items-center justify-center mb-5"
      >
        <Excalidraw
          ref={excalidrawRef}
          onChange={onChange}
          viewModeEnabled={!currentPlayer.isPlayerTurn}
        />
      </div>
      <div className="p-2">
        <ProgressBar />
      </div>
    </div>
  );
}
