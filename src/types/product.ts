import { Category } from "./category";

export interface ProductItem {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export type ProductList = ProductItem[];
