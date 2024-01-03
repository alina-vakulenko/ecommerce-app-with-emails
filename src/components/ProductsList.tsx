import { useEffect, useState } from "react";
import { ProductList } from "../types/product";
import ProductsService from "../api/ProductsService";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [products, setProducts] = useState<ProductList>([]);
  const [status, setStatus] = useState<
    "loading" | "failed" | "success" | "idle"
  >("idle");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const res = await ProductsService.getAllProducts();
        setProducts(res.data);
      } catch (err) {
        setStatus("failed");
        setErrMessage("Error loading products");
      } finally {
        setStatus("idle");
      }
    };

    fetchProducts();
  }, []);

  if (status === "loading") {
    return <div>LOADING</div>;
  }
  if (status === "failed") {
    return <div>{errMessage}</div>;
  }
  return products.length > 0 ? (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard data={product} />
        </li>
      ))}
    </ul>
  ) : null;
};

export default ProductsList;
