import { useForm, FormProvider } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import { Icon, InlineIcon } from "@iconify/react";
import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import { CATEGORIES } from "@/utils/categories";
import { MAXIMUM_POINTS } from "@/utils/maximumPoints";
import { CreateRoom } from "@/types/Room";
import { useCreateRoomMutation } from "@/redux/api";
import { socket } from "@/utils/socket";
import { MessageResponse } from "@/types/MessageResponse";
import { useEffect, useState } from "react";

export default function CreateRoomDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const methods = useForm<CreateRoom>();
  const [createRoom] = useCreateRoomMutation();

  useEffect(() => {
    if (socket.disconnected) {
      socket.connect();
    }
    socket.on("room-created", (response: MessageResponse) => {
      toast.success(response.message);
      setIsDialogOpen(false);
      methods.reset();
    });
    socket.on("create-room-error", (response: MessageResponse) => {
      toast.error(response.message);
    });
  }, [methods]);

  const onSubmit = (data: CreateRoom) => {
    createRoom(data);
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <Button title="Create room" icon="cil:room" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[90vh]  w-[70vw] md:w-[35vw]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-nord-5 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-nord-0 m-0 text-[17px] font-medium">
            Create Room
          </Dialog.Title>

          <FormProvider {...methods}>
            <Form.Root onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="p-2 flex flex-col justify-center items-center ">
                <Input
                  inputProps={{
                    name: "name",
                    label: "Room name",
                    message: "Please provide a nickname",
                    required: true,
                  }}
                />
                <Select
                  selectProps={{
                    name: "category",
                    label: "Category",
                    message: "Please select a category",
                    required: true,
                  }}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
                <Select
                  selectProps={{
                    name: "maximumPoints",
                    label: "Maximum points",
                  }}
                >
                  {MAXIMUM_POINTS.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
                <Input
                  inputProps={{
                    name: "maximumNumberOfPlayers",
                    label: "Maximum number of players",
                    defaultValue: 2,
                    type: "number",
                  }}
                />

                <Form.Submit className="mt-4 w-full flex justify-center">
                  <Button title="Create" />
                </Form.Submit>
              </div>
            </Form.Root>
          </FormProvider>
          <Dialog.Close asChild>
            <button
              className="text-nord-0 hover:bg-nord-4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              {<Icon icon="eva:close-fill" />}
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
