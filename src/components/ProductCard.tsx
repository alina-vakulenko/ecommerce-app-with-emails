import { ProductItem } from "../types/product";

interface ProductCardProps {
  data: ProductItem;
}

const ProductCard = ({ data }: ProductCardProps) => {
  return <div>{data.title}</div>;
};

export default ProductCard;
