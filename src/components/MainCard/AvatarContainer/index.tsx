"use client";
import { useState } from "react";
import Avatar from "avataaars";
import { Icon } from "@iconify/react";
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
    <div className=" w-full h-[40%] flex flex-col justify-center items-center">
      <div className="rounded-full mb-5">
        <Avatar
          style={{ width: "150px", height: "150px" }}
          avatarStyle="Circle"
          {...randomAvatar}
        />
      </div>
      <button
        onClick={toggleRandomAvatar}
        className="w-12 h-12 flex justify-center items-center bg-nord-13 rounded-md mb-2 border-2 border-nord-11 shadow-lg"
      >
        <Icon icon={"fa-solid:dice"} className="w-8 h-8  text-nord-1" />
      </button>
    </div>
  );
}
