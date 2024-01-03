import { useLoaderData, useParams } from "react-router-dom";
import ProductsService from "@/api/ProductsService";
import { ProductItem } from "@/types/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = useLoaderData() as ProductItem;
  return <div>{product.title}</div>;
};

export default ProductDetailsPage;

export const productDetailsLoader = async ({ params }) => {
  try {
    const res = await ProductsService.getProductById(params.id);
    if (!res.data) {
      throw Error("Product not found");
    }
    return res.data;
  } catch (err) {
    throw Error("Product not found");
  }
};
