import ProductsService from "@/api/ProductsService";

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
