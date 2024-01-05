import { Controller, Control } from "react-hook-form";
import InputMask from "react-input-mask";
import { Input } from "./ui/input";

interface PhoneInputProps {
  control: Control;
}

const PhoneInput = ({ control }: PhoneInputProps) => {
  return (
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <InputMask
          {...field}
          mask="+999 (99) 999-99-99"
          maskChar=" "
          placeholder="+___ (__) ___-__-__"
        >
          {(inputProps) => <Input {...inputProps} />}
        </InputMask>
      )}
    />
  );
};

export default PhoneInput;
