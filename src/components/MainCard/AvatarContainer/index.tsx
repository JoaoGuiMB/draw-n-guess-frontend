"use client";
import Avatar from "avataaars";
import { generateRandomAvatar } from "@/utils/generateRandomAvatar";
import { useEffect, useState } from "react";

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
      <button onClick={toggleRandomAvatar}>Dice</button>
    </div>
  );
}
