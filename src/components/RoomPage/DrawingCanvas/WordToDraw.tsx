import useGame from "@/hooks/useGame";

export default function WordToDraw() {
  const { isWaitingForPlayers, currentPlayer, currentRoom } = useGame();
  const message = isWaitingForPlayers
    ? "Waiting for new players to start game..."
    : currentPlayer?.isPlayerTurn
    ? `Your word to draw is: ${currentRoom?.currentWord}`
    : `${currentRoom.currentPlayer} is drawing`;
  return (
    <div className="flex justify-center items-center w-full h-[15%] font-bold">
      {message}
    </div>
  );
}
