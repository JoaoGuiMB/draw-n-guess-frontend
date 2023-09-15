import { useTypedSelector } from "@/hooks/useRedux";

export default function Messages() {
  const messages = useTypedSelector((state) => state.roomReducer.room.chat);

  return (
    <div className="mb-1 overflow-y-auto">
      {messages?.map((message, i) => (
        <div
          key={`${message}-${i}`}
          className={`truncate text-ellipsis overflow-y-auto ${
            message.includes("got the right word")
              ? " text-green-600 "
              : " text-nord-0 "
          }}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
}
