import { useDispatchHook, useTypedSelector } from "@/hooks/useRedux";
import { CATEGORIES } from "@/utils/categories";
import { socket } from "@/utils/socket";
import { Icon } from "@iconify/react";
import { setPlayerId } from "@/redux/slices/player";
import { setCurrentRoom } from "@/redux/slices/room";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CustomError } from "@/types/Error";
import { JoinRoom } from "@/types/Room";

interface RoomListItemProps {
  name: string;
  currentNumberOfPlayers: number;
  category: string;
  maximumNumberOfPlayers: number;
}

export default function RoomListItem({
  name,
  category,
  currentNumberOfPlayers,
  maximumNumberOfPlayers,
}: RoomListItemProps) {
  const categoryIcon = CATEGORIES.find((c) => c.value === category)?.icon;
  const playerSelector = useTypedSelector((state) => state.playerReducer);
  const dispatch = useDispatchHook();
  const router = useRouter();

  const handleJoinRoom = () => {
    socket.emit("join-room", { roomName: name, player: playerSelector });
    socket.on("player-joined-room", (joinRoomData: JoinRoom) => {
      dispatch(setPlayerId(joinRoomData.playerId));
      dispatch(setCurrentRoom(joinRoomData.room));
      router.push(`/${name}`);
    });
    socket.on("join-room-error", (error: CustomError) => {
      toast.error(error.message);
    });
  };

  console.log(playerSelector);

  return (
    <li
      onClick={handleJoinRoom}
      className="border-nord-1 border-2 w-[70%] bg-nord-6 rounded-md h-[180px] flex flex-col justify-center items-center mt-4 shadow-md hover:cursor-pointer hover:transform hover:scale-105"
    >
      <div>
        <Icon icon={categoryIcon || ""} className="w-20 h-20" />
      </div>
      <div className="max-w-[100px] truncate font-bold">{name}</div>

      <div className="flex justify-center items-center text-center mt-2">
        {currentNumberOfPlayers}/{maximumNumberOfPlayers}{" "}
        <Icon icon="mdi:account" className="ml-2 text-nord-2 w-6 h-6" />
      </div>
    </li>
  );
}
