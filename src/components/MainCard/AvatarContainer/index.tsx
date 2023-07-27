"use client";
import { useState } from "react";
import Avatar from "avataaars";
import { Icon } from "@iconify/react";
import * as Form from "@radix-ui/react-form";
import { generateRandomAvatar } from "@/utils/generateRandomAvatar";

export default function AvatarContainer() {
  const [randomAvatar, setRandomAvatar] = useState({
    eyeType: "Side",
    accessoriesType: "Prescription02",
    topType: "WinterHat2",
    hairColor: "Red",
    facialHairType: "MoustacheFancy",
    clotheType: "ShirtCrewNeck",
    eyebrowType: "RaisedExcitedNatural",
    mouthType: "Concerned",
    skinColor: "Black",
  });

  const toggleRandomAvatar = () => {
    setRandomAvatar(generateRandomAvatar());
  };

  return (
    <div className="h-[40%] flex flex-col justify-center items-center">
      <div className="rounded-full mb-5">
        <Avatar
          style={{ width: "150px", height: "150px" }}
          avatarStyle="Circle"
          {...randomAvatar}
        />
      </div>
      <button
        onClick={toggleRandomAvatar}
        className="w-12 h-12 flex justify-center items-center bg-nord-7 rounded-md mb-2 border-4  shadow-lg"
      >
        <Icon icon={"fa-solid:dice"} className="w-8 h-8  text-nord-6" />
      </button>
      <Form.Root>
        <Form.Field name="nickname">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-nord-2">
              Nickname
            </Form.Label>
            <Form.Message
              className="text-[13px] text-2 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your nickname
            </Form.Message>
            <Form.Message
              className="text-[13px] text-2 opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a nickname
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border bg-nord-6 w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-2 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
              type="text"
              required
            />
          </Form.Control>
        </Form.Field>
      </Form.Root>
    </div>
  );
}
