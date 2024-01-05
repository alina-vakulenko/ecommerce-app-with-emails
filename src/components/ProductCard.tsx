import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { productAdded, selectCart } from "@/redux/cartSlice";
import type { ProductItem } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  data: ProductItem;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart);
  const isInCart = Boolean(cart[data.id]);

  const { toast } = useToast();

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(productAdded(data));
    toast({
      title: "Item added to the cart",
      description: data.title,
    });
  };

  return (
    <Card className="w-72 h-96 flex flex-col gap-1 hover:translate-y-1 transition-transform">
      <CardHeader>
        <CardTitle className="truncate">{data.title}</CardTitle>
        <CardDescription className="ml-auto border border-zinc-200 rounded-md px-2 capitalize">
          {data.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="h-36">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="font-semibold text-center mt-auto">{data.price}$</div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button onClick={addToCart} className="w-full">
          {isInCart ? "Add one more" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
