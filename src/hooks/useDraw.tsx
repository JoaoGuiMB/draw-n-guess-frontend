import { useRef, useEffect } from "react";

import { socket } from "@/utils/socket";

import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useGame } from "./useGame";

export const useDraw = () => {
  const { currentRoom, currentPlayer } = useGame();
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const viewModeEnabled = !currentPlayer?.isPlayerTurn;

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

  const resetScene = () => {
    console.log("reset scene");
    console.log(excalidrawRef.current);
    excalidrawRef.current?.resetScene();
  };

  useEffect(() => {
    if (!currentPlayer?.isPlayerTurn) {
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
    socket.on("reset-turn", () => {
      resetScene();
    });
    return () => {
      socket.off("update-canvas-state");
    };
  }, [currentPlayer?.isPlayerTurn, currentRoom?.players]);

  const onChange = (excalidrawElements: readonly ExcalidrawElement[]) => {
    socket.emit("player-draw", {
      roomName: currentRoom?.name,
      excalidrawElements,
    });
  };
  return { onChange, excalidrawRef, viewModeEnabled, resetScene };
};
