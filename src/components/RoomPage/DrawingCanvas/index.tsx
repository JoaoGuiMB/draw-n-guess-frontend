import useDraw, { DrawProps } from "@/hooks/useDraw";
import { useDispatchHook, useTypedSelector } from "@/hooks/useRedux";
import { DrawOptions } from "@/types/DrawOptions";
import { draw } from "@/utils/draw";
import { socket } from "@/utils/socket";
import { useCallback, useEffect, useRef } from "react";

export default function DrawingCanvas() {
  const currentRoom = useTypedSelector((state) => state.roomReducer.room);
  const dispatch = useDispatchHook();
  const strokeColor = "#000000";
  const strokeWidth = [2];
  const dashGap = [7];

  const containerRef = useRef<HTMLDivElement>(null);

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const drawOptions = {
        ctx,
        currentPoint,
        prevPoint,
        strokeColor,
        strokeWidth,
        dashGap,
      };
      draw(drawOptions);
      socket.emit("player-draw", {
        drawOptions,
        roomName: currentRoom.name,
      });
    },
    [strokeWidth, strokeColor, dashGap, currentRoom.name]
  );

  const { canvasRef, onInteractStart, clear, undo } = useDraw(onDraw);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { width, height } = containerRef.current?.getBoundingClientRect();
      const MARGIN = 20;

      canvasRef.current.width = width - MARGIN;
      canvasRef.current.height = height - MARGIN;
    };

    setCanvasDimensions();
  }, [canvasRef]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.on("update-canvas-state", (drawOptions: DrawOptions) => {
      if (!ctx) return;
      draw({ ...drawOptions, ctx });
    });
  }, [canvasRef, currentRoom]);

  return (
    <div
      ref={containerRef}
      className="flex h-[90%] w-full items-center justify-center mb-5"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={onInteractStart}
        onTouchStart={onInteractStart}
        className="touch-none rounded border bg-white mb-2"
      />
    </div>
  );
}
