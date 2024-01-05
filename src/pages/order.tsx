import emailjs from "@emailjs/browser";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";
import * as z from "zod";
import { render } from "@react-email/render";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCleared, selectCart } from "@/redux/cartSlice";
import { Button, buttonVariants } from "@/components/ui/button";
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
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "@/components/cart/CartItems";
import { ArrowLeft } from "lucide-react";
import OrderConfirmedEmail from "@/emails/OrderConfirmed";

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

type FormInputs = z.infer<typeof orderFormSchema>;

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cart = useAppSelector(selectCart);

  const form = useForm<FormInputs>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const sendEmail = (recipientInfo: FormInputs) => {
    const emailHtml = render(
      <OrderConfirmedEmail cart={cart.cart} totalPrice={cart.totalPrice} />
    );

    const templateParams = {
      name: recipientInfo.name,
      phone: recipientInfo.phone,
      to: recipientInfo.email,
      message: emailHtml,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast({
            title: "Order confirmed🙌",
            description: "You will recieve order details on the provided email",
          });
          setTimeout(() => {
            navigate("/");
            dispatch(cartCleared());
          }, 1000);
        },
        () => {
          toast({
            title: "Failed to send email",
            description: "Please try again",
            variant: "destructive",
          });
        }
      );
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const message = {
      customer: {
        ...data,
      },
      ...cart,
    };

    console.log(message);
    sendEmail(data);
  };

  return (
    <MaxWidthWrapper>
      <h1>Your order</h1>
      <div className="grid grid-cols-2 gap-8 mb-16">
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <InputMask
                      {...field}
                      mask="+999 (99) 999-99-99"
                      maskChar=" "
                      placeholder="+___ (__) ___-__-__"
                    >
                      <Input type="tel" />
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <Button type="submit">Confirm order</Button>
            </div>
          </form>
        </Form>
        <CartItems disableEditing />
      </div>
    </MaxWidthWrapper>
  );
};

export default OrderPage;
