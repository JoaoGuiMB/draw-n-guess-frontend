"use client";
import Chat from "@/components/RoomPage/Chat";
import DrawingCanvas from "@/components/RoomPage/DrawingCanvas";
import PlayersList from "@/components/RoomPage/PlayersList";
import useGame from "@/hooks/useGame";
import { useDispatchHook, useTypedSelector } from "@/hooks/useRedux";
import useWindowSize from "@/hooks/useWindowSize";
import { updateIsPlayerTurn } from "@/redux/slices/player";
import { setCurrentRoom } from "@/redux/slices/room";
import { Room } from "@/types/Room";
import { socket } from "@/utils/socket";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoomPage() {
  const { isMobile } = useWindowSize();

  const { currentPlayer, currentRoom, isWaitingForPlayers } = useGame();

  if (isMobile) {
    return (
      <div className="w-full h-[92vh] flex flex-col">
        <div className="h-[60%] w-full md:h-full">
          {isWaitingForPlayers ? (
            "Waiting for new players to game start..."
          ) : (
            <DrawingCanvas />
          )}
          <p className="bg-red-500">
            Current Player Drawning: {currentRoom?.currentPlayer}
          </p>
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
    );
  }

  return (
    <div className="w-full h-[92vh] flex">
      <div className="w-[20%] h-full">
        <PlayersList />
      </div>
      <div className="flex h-full flex-col w-full">
        <div className="h-[60%] w-full p-2">
          <p className="bg-red-500">
            Current Player Drawning: {currentRoom?.currentPlayer}
          </p>
          <p className="bg-red-500">
            Is Current Player Turn: {currentPlayer.isPlayerTurn ? "Yes" : "No"}
          </p>
          {isWaitingForPlayers ? (
            "Waiting for new players to game start..."
          ) : (
            <DrawingCanvas />
          )}
        </div>
        <div className="h-[40%] ">
          <Chat />
        </div>
      </div>
    </div>
  );
}
