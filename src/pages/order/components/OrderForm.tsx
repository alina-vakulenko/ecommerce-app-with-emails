import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import PhoneInputMasked from "./PhoneInputMasked";

const orderFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name should not be shorter than 2 characters")
    .max(20, "Name should not be longer than 20 characters"),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().refine(
    (value) => {
      const phoneNumber = value.replace(/[^\d+]+/g, "");
      return /^(\+380)\d{9}$/.test(phoneNumber);
    },
    {
      message: "Invalid phone number. Please ensure it starts with +380...",
    }
  ),
});

export type FormInputs = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  onSubmit: SubmitHandler<FormInputs>;
}

const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full mx-auto px-12 py-8 border rounded-md border-primary/10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                You will recieve confirmation letter on this email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhoneInputMasked control={form.control} />
        <div className="flex items-center justify-between">
          <Link
            to="/cart"
            className={buttonVariants({
              variant: "secondary",
              className: "flex gap-1",
            })}
          >
            <ArrowLeft />
            Back to cart
          </Link>
          <Button
            type="submit"
            className="flex gap-1"
            disabled={form.formState.isSubmitting}
          >
            Confirm order
            {form.formState.isSubmitting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : null}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
