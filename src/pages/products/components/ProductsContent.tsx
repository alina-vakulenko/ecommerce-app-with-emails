import { useEffect, useState } from "react";
import { useAsyncValue, useSearchParams } from "react-router-dom";
import { usePagination } from "@/lib/usePagination";
import type { ProductList } from "@/types/product";
import ProductsList from "./ProductsList";
import ProductsPagination from "./ProductsPagination";

const PRODUCTS_PER_PAGE = 6;

const ProductsContent = () => {
  const [searchParams] = useSearchParams();

  const { data: products } = useAsyncValue() as { data: ProductList };

  const [filteredProducts, setFilteredProducts] =
    useState<ProductList>(products);

  const {
    setCurrPage,
    paginatedItems: paginatedProducts,
    ...paginationProps
  } = usePagination({
    perPage: PRODUCTS_PER_PAGE,
    items: filteredProducts,
  });

  useEffect(() => {
    let searchFilterTimeout: ReturnType<typeof setTimeout> | null = null;
    searchFilterTimeout && clearTimeout(searchFilterTimeout);

    const query = searchParams.get("q");

    const filterProducts = () => {
      if (!query) {
        setCurrPage(1);
        setFilteredProducts(products);
        return;
      }

      searchFilterTimeout = setTimeout(() => {
        setCurrPage(1);
        setFilteredProducts(
          products.filter((product) =>
            product.title.toLowerCase().includes(query.trim().toLowerCase())
          )
        );
      }, 500);
    };

    filterProducts();
  }, [searchParams, setCurrPage, products]);

  if (filteredProducts.length === 0) {
    return (
      <h2 className="flex items-center justify-center font-semibold text-2xl flex-1">
        Products not found
      </h2>
    );
  }

  return (
    <>
      <ProductsList products={paginatedProducts} />
      <ProductsPagination {...paginationProps} />
    </>
  );
};

export default ProductsContent;
