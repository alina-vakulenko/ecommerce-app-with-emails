import { Control } from "react-hook-form";
import InputMask from "react-input-mask";
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
