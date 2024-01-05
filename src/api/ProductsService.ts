import { axiosInstance } from "./axios";
import type { Category } from "@/types/category";
import type {
  CategoriesListResponse,
  ProductItemResponse,
  ProductsListResponse,
} from "./types";

export default {
  getAllProducts: async (): ProductsListResponse => {
    return await axiosInstance.get("/products");
  },
  getProductById: async (id: number): ProductItemResponse => {
    return await axiosInstance.get(`/products/${id}`);
  },
  getAllCategories: async (): CategoriesListResponse => {
    return await axiosInstance.get("/products/categories");
  },
  getProductsByCategory: async (category: Category): ProductsListResponse => {
    return await axiosInstance.get(`/products/category/${category}`);
  },
};
