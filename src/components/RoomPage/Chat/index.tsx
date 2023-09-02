import { useEffect } from "react";
import Input from "@/components/Form/Input";
import { useForm, FormProvider } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import Messages from "./ChatMessage";
import Button from "@/components/Button";
import { Guess, Room } from "@/types/Room";
import { useTypedSelector, useDispatchHook } from "@/hooks/useRedux";
import { socket } from "@/utils/socket";
import { setChatMessages } from "@/redux/slices/room";

interface SubmitGuess {
  guess: string;
}

export default function Chat() {
  const dispatch = useDispatchHook();
  const methods = useForm<SubmitGuess>();
  const currentPlayer = useTypedSelector((state) => state.playerReducer);
  const currentRoom = useTypedSelector((state) => state.roomReducer);

  useEffect(() => {
    socket.on("update-chat", (chat: string[]) => {
      dispatch(setChatMessages(chat));
    });
  }, [currentRoom, dispatch]);

  const submitGuess = (data: SubmitGuess) => {
    const { guess } = data;
    const playerGuess: Guess = {
      roomName: currentRoom.room.name,
      guess,
      playerNickname: currentPlayer.nickName,
    };
    socket.emit("player-guess", playerGuess);
    methods.resetField("guess");
  };

  return (
    <div className="bg-nord-4 w-full h-full border-4 border-nord-6 p-4 pb-0 flex flex-col justify-between">
      <div className="bg-nord-6 w-full h-full rounded-md mb-2 overflow-y-auto p-2 flex flex-col">
        <Messages />
      </div>
      <div>
        <FormProvider {...methods}>
          <Form.Root onSubmit={methods.handleSubmit(submitGuess)}>
            <div className="flex justify-between ">
              <div className="w-full mr-2">
                <Input
                  inputProps={{
                    name: "guess",
                    required: true,
                    type: "text",
                    placeholder: "Type your guess here",
                  }}
                />
              </div>
              <Button title="Send" icon="cil:send" type="submit" />
            </div>
          </Form.Root>
        </FormProvider>
      </div>
    </div>
  );
}
