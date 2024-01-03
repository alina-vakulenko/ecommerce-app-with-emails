import { axiosClient } from "./axios";
import { ProductItem, ProductList } from "../types/product";
import { AxiosResponse } from "axios";

export default {
  getAllProducts: async (): Promise<AxiosResponse<ProductList>> => {
    return await axiosClient.get("/products");
  },
  getProductById: async (id: number): Promise<AxiosResponse<ProductItem>> => {
    return await axiosClient.get(`/products/${id}`);
  },
  getAllCategories: async (): Promise<AxiosResponse<string[]>> => {
    return await axiosClient.get("/products/categories");
  },
  getProductsByCategory: async (
    category: string
  ): Promise<AxiosResponse<ProductList>> => {
    return await axiosClient.get(`/products/category/${category}`);
  },
};
