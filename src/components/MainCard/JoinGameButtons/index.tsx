"use client";
import Button from "@/components/Button";

import CreateRoomDialog from "../CreateRoomDialog";

export default function JoinGameButtons() {
  return (
    <div className="flex flex-col justify-center items-center p-9">
      <Button title="Play" icon="mingcute:game-2-line" />
      <CreateRoomDialog />
    </div>
  );
}
