"use client";
import Avatar from "avataaars";

export default function AvatarContainer() {
  return (
    <div className=" w-full h-[40%] flex justify-center items-center">
      <div className="rounded-full">
        <Avatar
          style={{ width: "100px", height: "100px" }}
          avatarStyle="Circle"
          topType="LongHairMiaWallace"
          accessoriesType="Prescription02"
          hairColor="BrownDark"
          facialHairType="Blank"
          clotheType="Hoodie"
          clotheColor="PastelBlue"
          eyeType="Happy"
          eyebrowType="Default"
          mouthType="Smile"
          skinColor="DarkBrown"
        />
      </div>
    </div>
  );
}
