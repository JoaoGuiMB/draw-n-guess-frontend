"use client";

import { useRef } from "react";
import WordToDraw from "./WordToDraw";
import { Excalidraw } from "@excalidraw/excalidraw";
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
