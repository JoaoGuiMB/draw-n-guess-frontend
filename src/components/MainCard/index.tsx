import AvatarContainer from "./AvatarContainer";
import JoinGameButtons from "./JoinGameButtons";

export default function MainCard() {
  return (
    <div className="w-[80%] bg-nord-4 rounded-lg p-4">
      <AvatarContainer />
      <JoinGameButtons />
    </div>
  );
}
