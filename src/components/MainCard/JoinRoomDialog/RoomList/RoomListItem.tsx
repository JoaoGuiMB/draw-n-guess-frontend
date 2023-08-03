import Button from "@/components/Button";
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
  return (
    <>
      <li className="flex w-full  justify-evenly text-center">
        <div className="max-w-[100px] truncate">{name}</div>
        <div>{category}</div>
        <div>
          {currentNumberOfPlayers}/{maximumNumberOfPlayers}
        </div>
        <Button title="Join room" />
      </li>
      <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
    </>
  );
}
