import { useRef } from "react";
import { Control } from "react-hook-form";
import InputMask, { ReactInputMask } from "react-input-mask";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputs } from "./OrderForm";

interface PhoneInputProps {
  control: Control<FormInputs>;
}

const PhoneInputMasked = ({ control }: PhoneInputProps) => {
  const inputRef = useRef<ReactInputMask | null>(null);

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone number</FormLabel>
          <FormControl>
            <InputMask
              {...field}
              ref={(el) => (inputRef.current = el)}
              mask="+999 (99) 999-99-99"
              maskPlaceholder="_"
              alwaysShowMask
            >
              <Input />
            </InputMask>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneInputMasked;
