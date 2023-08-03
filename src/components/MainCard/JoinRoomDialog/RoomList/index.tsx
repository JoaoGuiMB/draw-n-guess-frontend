import { useGetRoomsQuery } from "@/redux/api";
import RoomListItem from "./RoomListItem";

export default function RoomList() {
  const { data } = useGetRoomsQuery();

  return (
    <div>
      <ul className=" max-h-[50vh] overflow-y-auto ml-8   grid grid-cols-2 md:grid-cols-4 ">
        {data?.map((room) => (
          <RoomListItem
            key={room.name}
            name={room.name}
            category={room.category}
            currentNumberOfPlayers={room.players?.length || 0}
            maximumNumberOfPlayers={room.maximumNumberOfPlayers}
          />
        ))}
      </ul>
    </div>
  );
}
