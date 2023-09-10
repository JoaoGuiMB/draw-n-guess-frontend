import { useEffect, useCallback } from "react";
import { useDispatchHook, useTypedSelector } from "./useRedux";
import { useRouter } from "next/navigation";
import { setChatMessages, setCurrentRoom } from "@/redux/slices/room";
import { socket } from "@/utils/socket";
import { updateIsPlayerTurn } from "@/redux/slices/player";
import { Guess, Room, SubmitGuess } from "@/types/Room";
import { Player } from "@/types/Player";

interface GameHook {
  isWaitingForPlayers: boolean;
  currentRoom: Room;
  currentPlayer: Player;
  submitGuess: (data: SubmitGuess) => void;
}

export default function useGame(): GameHook {
  const dispatch = useDispatchHook();
  const currentRoom = useTypedSelector((state) => state.roomReducer.room);
  const currentPlayer = useTypedSelector((state) => state.playerReducer);
  const router = useRouter();

  if (!currentPlayer?.id) {
    router.replace("/");
  }

  const isWaitingForPlayers = currentRoom?.players?.length < 2;
  const thereIsAPlayerDrawing = useCallback(() => {
    return currentRoom.players?.find((player) => player.isPlayerTurn);
  }, [currentRoom.players]);

  useEffect(() => {
    if (!currentPlayer.id) {
      return;
    }
    // Start Turn
    if (!isWaitingForPlayers && !thereIsAPlayerDrawing()) {
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
      if (currentRoom.currentWord && !thereIsAPlayerDrawing()) {
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
    thereIsAPlayerDrawing,
    isWaitingForPlayers,
  ]);

  useEffect(() => {
    // Update Chat
    if (!currentPlayer.id) {
      return;
    }
    socket.on("update-chat", (chat: string[]) => {
      dispatch(setChatMessages(chat));
    });
  }, [currentRoom, dispatch]);

  const submitGuess = (data: SubmitGuess) => {
    const { guess } = data;
    const playerGuess: Guess = {
      roomName: currentRoom.name,
      guess,
      playerNickname: currentPlayer.nickName,
    };
    socket.emit("player-guess", playerGuess);
  };

  return {
    isWaitingForPlayers,
    currentRoom,
    currentPlayer,
    submitGuess,
  };
}
