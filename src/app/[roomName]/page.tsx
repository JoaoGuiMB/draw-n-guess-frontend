"use client";
import Chat from "@/components/RoomPage/Chat";
import PlayersList from "@/components/RoomPage/PlayersList";
import { useTypedSelector } from "@/hooks/useRedux";
import useWindowSize from "@/hooks/useWindowSize";

import { useRouter } from "next/navigation";

export default function RoomPage() {
  const { id } = useTypedSelector((state) => state.playerReducer);

  const router = useRouter();
  const { isMobile } = useWindowSize();

  if (!id) {
    router.replace("/");
  }

  if (isMobile) {
    return (
      <div className="w-full h-[92vh] flex flex-col">
        <div className="h-[60%] bg-blue-500 md:h-full p-2">Game Board</div>
        <div className="flex h-full md:h-[90%]">
          <div className="w-[50%]">
            <PlayersList />
          </div>
          <div className="w-[50%] ">
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
        <div className="h-[60%] bg-blue-500 p-2">Game Board</div>
        <div className="h-[40%] ">
          <Chat />
        </div>
      </div>
    </div>
  );
}
