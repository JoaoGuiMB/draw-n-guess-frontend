import type { DrawProps } from "@/hooks/useDraw";

export interface PlayerDraw {
  drawOptions: DrawOptions;
  roomName: string;
}

export interface DrawOptions extends DrawProps {
  strokeColor: string;
  strokeWidth: number[];
  dashGap: number[];
}
