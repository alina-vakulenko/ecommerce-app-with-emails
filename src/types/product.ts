export interface ProductItem {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export type ProductList = ProductItem[];
