import useGame from "@/hooks/useGame";
import { Player } from "@/types/Player";
import { Icon } from "@iconify/react";
import Avatar from "avataaars";

interface PlayerListItemProps {
  player: Player;
}

export default function PlayerListItem({ player }: PlayerListItemProps) {
  const { avatar, nickName, points, isPlayerTurn } = player;

  return (
    <div className="flex w-full h-[18%] justify-between items-center p-2 border-nord-10 border-2 bg-nord-6 mb-2">
      <div className="max-w-[60%]">
        <Avatar
          style={{ width: "70px", height: "70px" }}
          avatarStyle="Circle"
          {...avatar}
        />
        <div className="mt-2 truncate">{nickName}</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {points} points
        {isPlayerTurn ? (
          <Icon
            icon={"material-symbols:draw"}
            className="text-nord-10"
            width={28}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
