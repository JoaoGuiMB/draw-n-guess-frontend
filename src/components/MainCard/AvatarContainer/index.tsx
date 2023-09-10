"use client";
import { useEffect, useState } from "react";
import Avatar from "avataaars";
import { Icon } from "@iconify/react";
import * as Form from "@radix-ui/react-form";
import { FormProvider, useForm } from "react-hook-form";
import { generateRandomAvatar } from "@/utils/generateRandomAvatar";
import Input from "@/components/Form/Input";
import { useDispatchHook } from "@/hooks/useRedux";
import {
  setPlayerName,
  setPlayerAvatar,
  updateIsPlayerTurn,
} from "@/redux/slices/player";
import { socket } from "@/utils/socket";
import useGame from "@/hooks/useGame";

export default function AvatarContainer() {
  const methods = useForm();
  const { currentPlayer } = useGame();
  const dispatch = useDispatchHook();

  useEffect(() => {
    if (currentPlayer.id) {
      socket.emit("player-leave-room");
      socket.on("player-left-room", () => {
        dispatch(updateIsPlayerTurn(false));
      });
    }
  }, []);

  const toggleRandomAvatar = () => {
    dispatch(setPlayerAvatar(generateRandomAvatar()));
  };

  return (
    <div className="h-[40%] flex flex-col justify-center items-center">
      <div className="rounded-full mb-5">
        <Avatar
          style={{ width: "150px", height: "150px" }}
          avatarStyle="Circle"
          {...currentPlayer.avatar}
        />
      </div>
      <button
        onClick={toggleRandomAvatar}
        className="w-12 h-12 flex justify-center items-center bg-nord-7 rounded-md mb-2 border-4  shadow-lg"
      >
        <Icon icon={"fa-solid:dice"} className="w-8 h-8  text-nord-6" />
      </button>
      <FormProvider {...methods}>
        <Form.Root>
          <Input
            inputProps={{
              name: "nickName",
              label: "Nickname",
              message: "Please provide a nickname",
              required: true,
              defaultValue: currentPlayer.nickName,
              onChange: (e) => {
                dispatch(setPlayerName(e.target.value));
              },
            }}
          />
        </Form.Root>
      </FormProvider>
    </div>
  );
}
