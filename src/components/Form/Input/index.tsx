import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";

interface Input {
  name: string;
  label: string;
  message?: string;
  required?: boolean;
  type?: string;
}

interface InputProps {
  inputProps: Input;
}

export default function Input({ inputProps }: InputProps) {
  const { name, message, label, required, type } = inputProps;
  const { register } = useFormContext();

  return (
    <Form.Field name={name} className="w-full">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-nord-2">
          {label}
        </Form.Label>

        <Form.Message
          className="text-[13px] text-2 opacity-[0.8]"
          match="valueMissing"
        >
          {message}
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          {...register(name, { required })}
          className="box-border bg-nord-6 w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-2 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-nord-0"
          type={type || "text"}
          max={type === "number" ? 10 : undefined}
          min={type === "number" ? 2 : undefined}
          defaultValue={type === "number" ? 2 : ""}
          required={required}
        />
      </Form.Control>
    </Form.Field>
  );
}
