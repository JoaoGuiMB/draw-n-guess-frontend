"use client";
import { socket } from "@/utils/socket";
import { useEffect, useRef } from "react";
import WordToDraw from "./WordToDraw";
import { useGame } from "@/hooks/useGame";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import ProgressBar from "./ProgressBar";
import { useDraw } from "@/hooks/useDraw";

export default function DrawingCanvas() {
  const { excalidrawRef, onChange, viewModeEnabled } = useDraw();

  const containerRef = useRef<HTMLDivElement>(null);

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
          viewModeEnabled={viewModeEnabled}
        />
      </div>
      <div className="p-2">
        <ProgressBar />
      </div>
    </div>
  );
}
