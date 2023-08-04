import { CATEGORIES } from "@/utils/categories";
import { Icon } from "@iconify/react";
import * as Separator from "@radix-ui/react-separator";

interface RoomListItemProps {
  name: string;
  currentNumberOfPlayers: number;
  category: string;
  maximumNumberOfPlayers: number;
}

export default function RoomListItem({
  name,
  category,
  currentNumberOfPlayers,
  maximumNumberOfPlayers,
}: RoomListItemProps) {
  const categoryIcon = CATEGORIES.find((c) => c.value === category)?.icon;
  return (
    <li className="border-nord-1 border-2 w-[70%] bg-nord-6 rounded-md h-[180px] flex flex-col justify-center items-center mt-4 shadow-md hover:cursor-pointer hover:transform hover:scale-105">
      <div>
        <Icon icon={categoryIcon || ""} className="w-20 h-20" />
      </div>
      <div className="max-w-[100px] truncate font-bold">{name}</div>

      <div className="flex justify-center items-center text-center mt-2">
        {currentNumberOfPlayers}/{maximumNumberOfPlayers}{" "}
        <Icon icon="mdi:account" className="ml-2 text-nord-2 w-6 h-6" />
      </div>
    </li>
  );
}
