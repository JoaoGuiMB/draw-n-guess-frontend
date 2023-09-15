"use client";
import Chat from "@/components/RoomPage/Chat";
import DrawingCanvas from "@/components/RoomPage/DrawingCanvas";
import PlayersList from "@/components/RoomPage/PlayersList";
import { GameProvider } from "@/hooks/useGame";
import useWindowSize from "@/hooks/useWindowSize";

export default function RoomPage() {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <GameProvider>
        <div className="w-full h-[92vh] flex flex-col">
          <div className="h-[60%] w-full md:h-full">
            <DrawingCanvas />
          </div>
          <div className="flex h-full md:h-[90%]">
            <div className="w-[50%]">
              <PlayersList />
            </div>
            <div className="w-[50%]">
              <Chat />
            </div>
          </div>
        </div>
      </GameProvider>
    );
  }

  return (
    <GameProvider>
      <div className="w-full h-[92vh] flex">
        <div className="w-[20%] h-full">
          <PlayersList />
        </div>
        <div className="flex h-full flex-col w-full">
          <div className="h-[60%] w-full">
            <DrawingCanvas />
          </div>
          <div className="h-[40%] ">
            <Chat />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}
