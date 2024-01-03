import { axiosClient } from "./axios";
import {
  CategoriesListResponse,
  ProductItemResponse,
  ProductsListResponse,
} from "./types";

export default {
  getAllProducts: async (): ProductsListResponse => {
    return await axiosClient.get("/products");
  },
  getProductById: async (id: number): ProductItemResponse => {
    return await axiosClient.get(`/products/${id}`);
  },
  getAllCategories: async (): CategoriesListResponse => {
    return await axiosClient.get("/products/categories");
  },
  getProductsByCategory: async (category: string): ProductsListResponse => {
    return await axiosClient.get(`/products/category/${category}`);
  },
};
