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
      dispatch(setPlayers(data));
    });
  }, [dispatch, players]);

  const playersCopy = [...players];
  playersCopy.sort((a, b) => b.points - a.points);
  return (
    <div className="overflow-y-auto h-full bg-nord-4">
      {playersCopy?.map((player, i) => (
        <PlayerListItem player={player} key={`${player.id}-${i}`} />
      ))}
    </div>
  );
}
