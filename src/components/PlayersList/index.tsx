import { useDispatchHook, useTypedSelector } from "@/hooks/useRedux";
import PlayerListItem from "./PlayerListItem";
import { useEffect } from "react";
import { setPlayers } from "@/redux/slices/room";
import { socket } from "@/utils/socket";
import { Player } from "@/types/Player";

export default function PlayersList() {
  const dispatch = useDispatchHook();
  const players = useTypedSelector((state) => state.roomReducer).room.players;

  useEffect(() => {
    socket.on("update-players", (data: Player[]) => {
      console.log("aqui");
      dispatch(setPlayers(data));
    });
  }, [dispatch, players]);

  return (
    <div className="bg-yellow-500">
      {players?.map((player) => (
        <PlayerListItem player={player} key={player.id} />
      ))}
    </div>
  );
}
