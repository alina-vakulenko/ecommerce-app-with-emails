import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface CartItemQuantityButtonsProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const CartItemQuantityButtons = ({
  quantity,
  increaseQuantity,
  decreaseQuantity,
}: CartItemQuantityButtonsProps) => {
  return (
    <div className="flex">
      <Button
        onClick={increaseQuantity}
        variant="outline"
        size="icon"
        aria-label="increase quantity"
      >
        <Plus />
      </Button>
      <span className="w-10 flex items-center justify-center font-semibold">
        {quantity}
      </span>
      <Button
        onClick={decreaseQuantity}
        variant="outline"
        size="icon"
        aria-label="decrease quantity"
      >
        <Minus />
      </Button>
    </div>
  );
};

export default CartItemQuantityButtons;
