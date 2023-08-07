"use client";
import { useTypedSelector } from "@/hooks/useRedux";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { socket } from "@/utils/socket";

export default function RoomPage() {
  const { id } = useTypedSelector((state) => state.playerReducer);
  const { roomName } = useParams();

  const leaveRoomPage = () => {
    socket.emit("player-leave-room", { roomName, playerId: id });
  };
  const router = useRouter();

  if (!id) {
    router.replace("/");
  }

  return (
    <div className="w-full h-[92vh] bg-red-500 flex flex-col">
      <div className="h-[60%] bg-blue-500 md:h-full p-2">Game Board</div>
      <div className="flex h-full md:h-[90%]">
        <div className="w-[50%] bg-green-500">Players List</div>
        <div className="w-[50%] ">Chat</div>
      </div>
    </div>
  );
}
