import { selectCart } from "@/redux/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/cart/cart-item/CartItem";

interface CartItemsProps {
  disableEditing?: boolean;
}

const CartItems = ({ disableEditing = false }: CartItemsProps) => {
  const { cart } = useAppSelector(selectCart);
  const productsIds = Object.keys(cart);

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-8 bg-primary/10">
      <ul className="flex flex-col gap-4 mb-8">
        {productsIds.map((id) => (
          <li key={id}>
            <CartItem data={cart[Number(id)]} disableEditing={disableEditing} />
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default CartItems;
