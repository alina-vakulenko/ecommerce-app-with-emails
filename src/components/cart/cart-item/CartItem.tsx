import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import {
  type CartItem as CartItemType,
  productAdded,
  quantityDecreased,
  productRemoved,
} from "@/redux/cartSlice";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import CartItemQuantityButtons from "./CartItemQuantityButtons";
import CartItemImage from "./CartItemImage";

interface CartItemProps {
  data: CartItemType;
  disableEditing?: boolean;
}

const CartItem = ({ data, disableEditing }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const increaseQuantity = () => {
    dispatch(productAdded(data));
  };
  const decreaseQuantity = () => {
    dispatch(quantityDecreased({ id: data.id }));
  };
  const deleteItemFromCart = () => {
    dispatch(productRemoved({ id: data.id }));
  };

  return (
    <Card className="group">
      <CardHeader className="grid grid-cols-[1fr_80px] gap-4 py-1 items-center">
        <CardTitle className="text-md">{data.title}</CardTitle>
        {disableEditing ? null : (
          <Button
            onClick={deleteItemFromCart}
            variant="destructive"
            size="icon"
            className="opacity-0 group-hover:opacity-100 px-3 ml-auto transition-opacity"
            aria-label="remove item from the cart"
          >
            <Trash2 />
          </Button>
        )}
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent className="flex items-end justify-between">
        <div className="flex items-end gap-1">
          <CartItemImage src={data.image} alt={data.title} />
          <span className="font-semibold">{data.price}$</span>
        </div>
        {disableEditing ? null : (
          <CartItemQuantityButtons
            quantity={data.quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CartItem;
