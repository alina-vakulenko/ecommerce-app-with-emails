import { useLoaderData } from "react-router-dom";
import { ProductItem } from "@/types/product";

const ProductDetailsPage = () => {
  const product = useLoaderData() as ProductItem;
  return <div>{product.title}</div>;
};

export default ProductDetailsPage;
