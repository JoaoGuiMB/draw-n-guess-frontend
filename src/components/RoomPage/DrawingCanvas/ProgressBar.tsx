import * as Progress from "@radix-ui/react-progress";
import { useGame } from "@/hooks/useGame";

export default function ProgressBar() {
  const { currentRoom } = useGame();

  const progress = currentRoom?.timer ?? 60;

  return (
    <Progress.Root
      className="relative overflow-hidden bg-nord-9 rounded-full w-full h-[15px] "
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-white w-full h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(${progress}%)` }}
      />
    </Progress.Root>
  );
}
