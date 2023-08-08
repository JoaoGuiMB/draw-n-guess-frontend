import { useGetRoomsQuery } from "@/redux/api";
import RoomListItem from "./RoomListItem";

export default function RoomList() {
  const { data } = useGetRoomsQuery();

  if (data?.length === 0) {
    return <div className="flex justify-center">No room was created</div>;
  }

  console.log(data);

  return (
    <div>
      <ul className=" max-h-[50vh] overflow-y-auto ml-8 p-5  grid grid-cols-2 md:grid-cols-4 ">
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
