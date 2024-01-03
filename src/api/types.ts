import { AxiosResponse } from "axios";
import { ProductItem, ProductList } from "../types/product";

export type ProductsListResponse = Promise<AxiosResponse<ProductList>>;
export type ProductItemResponse = Promise<AxiosResponse<ProductItem>>;
export type CategoriesListResponse = Promise<AxiosResponse<string[]>>;
