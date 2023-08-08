import { Player } from "@/types/Player";
import Avatar from "avataaars";

interface PlayerListItemProps {
  player: Player;
}

export default function PlayerListItem({ player }: PlayerListItemProps) {
  const { avatar, nickName, points } = player;
  return (
    <div className="flex w-full h-[30%] justify-between items-center">
      <div>
        <Avatar
          style={{ width: "150px", height: "150px" }}
          avatarStyle="Circle"
          {...avatar}
        />
        <div>{nickName}</div>
      </div>
      <div>{points}</div>
    </div>
  );
}
