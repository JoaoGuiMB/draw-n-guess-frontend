import { Player } from "@/types/Player";
import Avatar from "avataaars";

interface PlayerListItemProps {
  player: Player;
}

export default function PlayerListItem({ player }: PlayerListItemProps) {
  const { avatar, nickName, points } = player;
  return (
    <div className="flex w-full h-[18%] justify-between items-center p-2 border-nord-10 border-2 bg-nord-6">
      <div className="max-w-[45%]">
        <Avatar
          style={{ width: "70px", height: "70px" }}
          avatarStyle="Circle"
          {...avatar}
        />
        <div className="mt-2 truncate">{nickName}</div>
      </div>
      <div>{points} points</div>
    </div>
  );
}
