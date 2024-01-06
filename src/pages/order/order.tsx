import { Navigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { render } from "@react-email/render";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCleared, selectCart } from "@/redux/cartSlice";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import CartItems from "@/components/cart/CartItems";
import OrderConfirmedEmail from "@/emails/OrderConfirmed";
import OrderForm, { FormInputs } from "./components/OrderForm";

const OrderPage = () => {
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const cart = useAppSelector(selectCart);

  const sendEmail = async (recipientInfo: FormInputs) => {
    const emailHtml = render(
      <OrderConfirmedEmail cart={cart.cart} totalPrice={cart.totalPrice} />
    );

    const templateParams = {
      name: recipientInfo.name,
      phone: recipientInfo.phone,
      to: recipientInfo.email,
      message: emailHtml,
    };

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const message = {
      customer: {
        ...data,
      },
      cart: {
        items: cart.cart,
        quantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
      },
    };

    console.log(message);

    try {
      await sendEmail(data);
      toast({
        title: "Order confirmed🙌",
        description: "You will recieve order details on the provided email",
      });
      dispatch(cartCleared());
    } catch {
      toast({
        title: "Failed to send email",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (Object.keys(cart.cart).length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <MaxWidthWrapper className="my-16">
      <h1 className="font-semibold text-3xl mb-8">Your order</h1>
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <OrderForm onSubmit={onSubmit} />
        <CartItems disableEditing />
      </div>
    </MaxWidthWrapper>
  );
};

export default OrderPage;
