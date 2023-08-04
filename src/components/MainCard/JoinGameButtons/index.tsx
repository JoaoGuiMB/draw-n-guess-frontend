"use client";
import CreateRoomDialog from "../CreateRoomDialog";
import JoinRoomDialog from "../JoinRoomDialog";

export default function JoinGameButtons() {
  return (
    <div className="flex flex-col justify-center items-center p-9">
      <JoinRoomDialog />
      <CreateRoomDialog />
    </div>
  );
}
