import {
  useEffect,
  useCallback,
  ReactNode,
  useContext,
  createContext,
} from "react";
import { useDispatchHook, useTypedSelector } from "./useRedux";
import { useRouter } from "next/navigation";
import {
  setChatMessages,
  setCurrentRoom,
  updateTimer,
} from "@/redux/slices/room";
import { socket } from "@/utils/socket";
import { updateIsPlayerTurn } from "@/redux/slices/player";
import { Guess, Room, SubmitGuess } from "@/types/Room";
import { Player } from "@/types/Player";

interface GameHook {
  currentRoom: Room;
  currentPlayer: Player;
  submitGuess: (data: SubmitGuess) => void;
}

const GameContext = createContext<GameHook>({} as GameHook);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatchHook();
  const currentRoom = useTypedSelector((state) => state.roomReducer.room);
  const currentPlayer = useTypedSelector((state) => state.playerReducer);
  const router = useRouter();

  useEffect(() => {
    if (!currentPlayer?.id) {
      router.replace("/");
    }
  }, [currentPlayer?.id, router]);

  const thereIsAPlayerDrawing = useCallback(() => {
    return currentRoom.players?.find((player) => player.isPlayerTurn);
  }, [currentRoom.players]);

  useEffect(() => {
    // Start turn
    if (!currentRoom.currentWord && currentRoom.name) {
      socket.emit("start-turn", currentRoom.name);
    }

    socket.on("drawing-player-left-room", () => {
      socket.emit("start-turn", currentRoom.name);
    });

    socket.on("turn-started", (data: Room) => {
      dispatch(setCurrentRoom(data));

      if (data.currentPlayer === currentPlayer.nickName) {
        dispatch(updateIsPlayerTurn(true));
      } else {
        dispatch(updateIsPlayerTurn(false));
      }
    });
    return () => {
      socket.off("turn-started");
      socket.off("drawing-player-left-room");
    };
  }, [thereIsAPlayerDrawing]);

  useEffect(() => {
    // Reset turn
    if (
      currentPlayer.nickName === currentRoom.currentPlayer &&
      currentRoom.name
    ) {
      socket.on("reset-turn", () => {
        socket.emit("start-turn", currentRoom.name);
      });
    }
    return () => {
      socket.off("reset-turn");
    };
  }, [currentPlayer.isPlayerTurn, currentRoom.name]);

  useEffect(() => {
    // Update Chat

    socket.on("update-chat", (chat: string[]) => {
      dispatch(setChatMessages(chat));
    });
  }, [dispatch]);

  useEffect(() => {
    // Update timer

    socket.on("update-timer", (timer: number) => {
      dispatch(updateTimer(timer));
    });
  }, [dispatch]);

  const submitGuess = (data: SubmitGuess) => {
    const { guess } = data;
    const playerGuess: Guess = {
      roomName: currentRoom.name,
      guess,
      playerNickname: currentPlayer.nickName,
    };
    socket.emit("player-guess", playerGuess);
  };

  return (
    <GameContext.Provider
      value={{
        currentRoom,
        currentPlayer,
        submitGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
