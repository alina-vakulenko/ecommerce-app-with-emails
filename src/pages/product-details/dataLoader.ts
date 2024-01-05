import { Params } from "react-router-dom";
import ProductsService from "@/api/ProductsService";

export const productDetailsLoader = async ({ params }: { params: Params }) => {
  try {
    const res = await ProductsService.getProductById(Number(params.id));
    if (!res.data) {
      throw new Response("Product not found", { status: 404 });
    }
    return res.data;
  } catch (err) {
    throw new Response("Product not found", { status: 404 });
  }
};
