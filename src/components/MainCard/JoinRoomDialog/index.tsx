import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";

import RoomList from "./RoomList";
import { socket } from "@/utils/socket";

export default function JoinRoomDialog() {
  const handlePlayButton = () => {
    socket.emit("get-rooms");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          title="Play"
          icon="fluent-mdl2:game"
          onClick={handlePlayButton}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed  w-[90%] top-[50%] left-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-nord-5 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-nord-0 m-0 text-[17px] font-medium">
            Join room
          </Dialog.Title>
          <Dialog.Description className="text-nord-0 mt-[10px] mb-5 text-[15px] leading-normal">
            Select your room to play
          </Dialog.Description>
          <RoomList />

          <Dialog.Close asChild>
            <button
              className="text-nord-0 hover:bg-nord-4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              {<Icon icon="eva:close-fill" />}
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
