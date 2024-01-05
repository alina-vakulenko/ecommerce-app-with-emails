import { AxiosResponse } from "axios";
import type { Category } from "@/types/category";
import type { ProductItem, ProductList } from "@/types/product";

export type ProductsListResponse = Promise<AxiosResponse<ProductList>>;
export type ProductItemResponse = Promise<AxiosResponse<ProductItem>>;
export type CategoriesListResponse = Promise<AxiosResponse<Category[]>>;
