import useDraw, { DrawProps } from "@/hooks/useDraw";
import { draw } from "@/utils/draw";
import { useCallback, useEffect, useRef } from "react";

export default function DrawingCanvas() {
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
      //socket.emit("draw", { drawOptions, roomId });
    },
    [strokeColor, strokeWidth, dashGap]
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

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={onInteractStart}
        onTouchStart={onInteractStart}
        className="touch-none rounded border bg-white "
      />
    </div>
  );
}
