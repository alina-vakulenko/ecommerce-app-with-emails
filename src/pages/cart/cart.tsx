import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCleared, selectCart } from "@/redux/cartSlice";
import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ClearCartAlertDialog from "@/pages/cart/components/ClearCartAlertDialog";
import EmptyCartPage from "./empyCart";
import CartItems from "../../components/cart/CartItems";
import CartTotals from "./components/CartTotals";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { totalPrice, totalQuantity } = useAppSelector(selectCart);

  if (totalQuantity === 0) {
    return <EmptyCartPage />;
  }

  const clearCart = () => {
    dispatch(cartCleared());
  };

  return (
    <MaxWidthWrapper className="mt-16">
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-semibold text-3xl">Cart</h1>
        <ClearCartAlertDialog onConfirm={clearCart} />
      </header>
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 mb-16">
        <CartItems />
        <div className="flex flex-col gap-6">
          <CartTotals totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Link
            to="/order"
            className={cn(buttonVariants(), "flex items-center gap-1")}
          >
            Proceed to order
            <ArrowRight />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CartPage;
