import { useGetRoomsQuery } from "@/redux/api";
import RoomListItem from "./RoomListItem";

export default function RoomList() {
  const { data, refetch } = useGetRoomsQuery();
  console.log(data);

  return (
    <div>
      <ul className=" max-h-[50vh]  overflow-y-auto ml-8 p-2">
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
