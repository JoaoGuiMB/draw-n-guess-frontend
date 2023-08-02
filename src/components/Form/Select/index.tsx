import * as Form from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";

interface Select {
  name: string;
  label: string;
  message?: string;
  required?: boolean;
}

interface SelectProps {
  selectProps: Select;
  children: React.ReactNode;
}

export default function Select({ selectProps, children }: SelectProps) {
  const { register } = useFormContext();
  const { name, message, label, required } = selectProps;
  return (
    <Form.Field className="w-full" name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-nord-2">
          {label}
        </Form.Label>

        <Form.Message
          className="text-[13px] text-2 opacity-[0.8]"
          match="typeMismatch"
        >
          {message}
        </Form.Message>
      </div>
      <Form.Control asChild>
        <select
          {...register(name, { required })}
          className="box-border bg-nord-6 w-full inline-flex h-[35px] items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-2 shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-nord-0"
          required={required}
          defaultValue={80}
        >
          {children}
        </select>
      </Form.Control>
    </Form.Field>
  );
}
