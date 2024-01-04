import { ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cartCleared, selectCart } from "@/redux/cartSlice";
import { Button } from "@/components/ui/button";
import CartItemCard from "@/components/cart-item/CartItem";
import EmptyCartPage from "./empyCart";
import { Separator } from "@/components/ui/separator";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ClearCartAlerDialog from "../../components/ClearCartAlerDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice, totalQuantity } = useAppSelector(selectCart);
  const productsIds = Object.keys(cart);

  const clearCart = () => {
    dispatch(cartCleared());
  };

  if (productsIds.length === 0) {
    return <EmptyCartPage />;
  }

  return (
    <MaxWidthWrapper>
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-semibold text-3xl">Cart</h1>
        <ClearCartAlerDialog onConfirm={clearCart} />
      </header>
      <div className="grid grid-cols-[1.5fr_1fr] gap-8 mb-16">
        <ScrollArea className="h-[600px] w-full rounded-md border p-8">
          <ul className="flex flex-col gap-4 mb-8">
            {productsIds.map((id) => (
              <li key={id}>
                <CartItemCard data={cart[Number(id)]} />
              </li>
            ))}
          </ul>
        </ScrollArea>
        {/* <Separator orientation="vertical" className="mx-8" /> */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              Items in the cart: {totalQuantity}
            </span>
            <span className="font-semibold text-lg">
              Amount to pay: {totalPrice}$
            </span>
          </div>
          <Button
            onClick={clearCart}
            size="lg"
            className="flex items-center gap-1"
          >
            Proceed to order
            <ArrowRight />
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CartPage;
