import { defer } from "react-router-dom";
import ProductsService from "@/api/ProductsService";

export const productsLoader = async ({ request }: { request: Request }) => {
  const category = new URL(request.url).searchParams.get("category");
  try {
    const productsPromise = category
      ? ProductsService.getProductsByCategory(category)
      : ProductsService.getAllProducts();
    const categoriesResponse = await ProductsService.getAllCategories();

    if (!categoriesResponse.data) {
      throw Error("Error loading categories");
    }

    const { data: categories } = categoriesResponse;

    return defer({
      products: productsPromise,
      categories,
    });
  } catch (err) {
    throw Error("Error loading data");
  }
};
