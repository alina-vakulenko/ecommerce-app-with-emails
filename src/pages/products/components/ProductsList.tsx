import { Link } from "react-router-dom";
import type { ProductList } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: ProductList;
}

const ProductsList = ({ products }: ProductsListProps) => {
  return products.length > 0 ? (
    <ul className="grid place-items-center gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`products/${product.id}`}>
            <ProductCard data={product} />
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
};

export default ProductsList;
