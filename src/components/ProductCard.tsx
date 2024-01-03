import { ProductItem } from "../types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface ProductCardProps {
  data: ProductItem;
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Card className="w-80 h-96 flex flex-col gap-1">
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
        <Button className="w-full">Buy</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
