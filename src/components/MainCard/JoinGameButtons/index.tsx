import Button from "@/components/Button";

export default function JoinGameButtons() {
  return (
    <div className="flex flex-col justify-center items-center p-9">
      <Button title="Play" icon="mingcute:game-2-line" />
      <Button title="Create room" icon="cil:room" />
    </div>
  );
}
