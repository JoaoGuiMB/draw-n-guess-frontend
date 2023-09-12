import Input from "@/components/Form/Input";
import { useForm, FormProvider } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import Messages from "./ChatMessage";
import Button from "@/components/Button";
import { SubmitGuess } from "@/types/Room";

import { useGame } from "@/hooks/useGame";

export default function Chat() {
  const { submitGuess } = useGame();
  const methods = useForm<SubmitGuess>();

  const onSubmitGuess = (data: SubmitGuess) => {
    submitGuess(data);
    methods.resetField("guess");
  };

  return (
    <div className="bg-nord-4 w-full h-full p-4 pb-0 flex flex-col justify-between">
      <div className="bg-nord-6 w-full h-full rounded-md mb-2 overflow-y-auto p-2 flex flex-col">
        <Messages />
      </div>
      <div>
        <FormProvider {...methods}>
          <Form.Root onSubmit={methods.handleSubmit(onSubmitGuess)}>
            <div className="flex justify-between flex-col md:flex-row  ">
              <div className="w-full mr-2 mb-2 md:mb-0">
                <Input
                  inputProps={{
                    name: "guess",
                    required: true,
                    type: "text",
                    placeholder: "Type your guess here",
                    maxLength: 30,
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
