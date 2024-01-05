interface CartTotalsProps {
  totalQuantity: number;
  totalPrice: number;
}

const CartTotals = ({ totalQuantity, totalPrice }: CartTotalsProps) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-lg">
        Items in the cart: {totalQuantity}
      </span>
      <span className="font-semibold text-lg">
        Amount to pay: {totalPrice}$
      </span>
    </div>
  );
};

export default CartTotals;
