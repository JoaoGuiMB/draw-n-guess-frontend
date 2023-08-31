import { useTypedSelector } from "@/hooks/useRedux";

export default function Messages() {
  const messages = useTypedSelector((state) => state.roomReducer.room.chat);

  return (
    <div className="mb-1">
      {messages.map((message, i) => (
        <div key={`${message}-${i}`}>{message}</div>
      ))}
    </div>
  );
}
