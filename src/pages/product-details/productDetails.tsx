import { useLoaderData } from "react-router-dom";
import { productAdded, selectCart } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ProductItem } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const ProductDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart);
  const product = useLoaderData() as ProductItem;
  const { toast } = useToast();

  const isInCart = Boolean(cart[product.id]);

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(productAdded(product));
    toast({
      title: "Item added to the cart",
      description: product.title,
    });
  };

  return (
    <MaxWidthWrapper>
      <div className="grid grid-col-auto sm:grid-cols-[1.5fr_1fr] gap-12 my-16">
        <div className="h-[200px] sm:h-[350px] lg:h-[500px]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="font-semibold text-2xl">{product.title}</h1>
            <Badge variant="secondary" className="capitalize p-2 text-md">
              {product.category}
            </Badge>
          </div>
          <h2 className="text-muted-foreground leading-5">
            {product.description}
          </h2>
          <div className="flex flex-col gap-8 lg:justify-between lg:flex-row lg:items-center">
            <span className="font-semibold text-xl">{product.price}$</span>
            <Button onClick={addToCart} size="lg">
              {isInCart ? "Add one more" : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductDetailsPage;
