import ProductsService from "@/api/ProductsService";

export const productsLoader = async ({ request }: { request: Request }) => {
  const category = new URL(request.url).searchParams.get("category");
  try {
    const productsResponse = category
      ? await ProductsService.getProductsByCategory(category)
      : await ProductsService.getAllProducts();
    const categoriesResponse = await ProductsService.getAllCategories();

    if (!productsResponse.data) {
      throw Error("Error loading products");
    }
    if (!categoriesResponse.data) {
      throw Error("Error loading categories");
    }

    const { data: products } = productsResponse;
    const { data: categories } = categoriesResponse;

    return {
      products,
      categories,
    };
  } catch (err) {
    throw Error("Error loading data");
  }
};
