"use client";
import Chat from "@/components/RoomPage/Chat";
import DrawingCanvas from "@/components/RoomPage/DrawingCanvas";
import PlayersList from "@/components/RoomPage/PlayersList";
import { useDispatchHook, useTypedSelector } from "@/hooks/useRedux";
import useWindowSize from "@/hooks/useWindowSize";
import { updateIsPlayerTurn } from "@/redux/slices/player";
import { setCurrentRoom } from "@/redux/slices/room";
import { Room } from "@/types/Room";
import { socket } from "@/utils/socket";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoomPage() {
  const router = useRouter();
  const currentPlayer = useTypedSelector((state) => state.playerReducer);
  const currentRoom = useTypedSelector((state) => state.roomReducer.room);

  const dispatch = useDispatchHook();
  const { isMobile } = useWindowSize();

  if (!currentPlayer?.id) {
    router.replace("/");
  }

  // Add custom hook
  const isWaitingForPlayers =
    currentPlayer?.id && currentRoom?.players.length < 2;

  useEffect(() => {
    if (!isWaitingForPlayers) {
      socket.emit("start-turn", currentRoom?.name);
      socket.on("turn-started", (data: Room) => {
        dispatch(setCurrentRoom(data));
        if (data.currentPlayer === currentPlayer.nickName) {
          dispatch(updateIsPlayerTurn(true));
        } else {
          dispatch(updateIsPlayerTurn(false));
        }
      });
    } else {
      if (currentRoom.currentWord) {
        socket.emit("stop-turn", currentRoom?.name);
        socket.on("turn-stopped", (data: Room) => {
          dispatch(setCurrentRoom(data));
          dispatch(updateIsPlayerTurn(false));
        });
      }
    }
  }, [
    currentPlayer.nickName,

    currentRoom?.name,
    dispatch,
    isWaitingForPlayers,
  ]);

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
