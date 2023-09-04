import { useEffect } from "react";
import { useDispatchHook, useTypedSelector } from "./useRedux";
import { useRouter } from "next/navigation";
import { setCurrentRoom } from "@/redux/slices/room";
import { socket } from "@/utils/socket";
import { updateIsPlayerTurn } from "@/redux/slices/player";
import { Room } from "@/types/Room";
import { Player } from "@/types/Player";

interface GameHook {
  isWaitingForPlayers: boolean;
  currentRoom: Room;
  currentPlayer: Player;
}

export default function useGame(): GameHook {
  const dispatch = useDispatchHook();
  const currentRoom = useTypedSelector((state) => state.roomReducer.room);
  const currentPlayer = useTypedSelector((state) => state.playerReducer);
  const router = useRouter();

  if (!currentPlayer?.id) {
    router.replace("/");
  }

  const isWaitingForPlayers = currentRoom?.players.length < 2;

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

  return {
    isWaitingForPlayers,
    currentRoom,
    currentPlayer,
  };
}
