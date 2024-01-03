import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { ProductList } from "@/types/product";
import ProductsService from "@/api/ProductsService";
import ProductsList from "@/components/ProductsList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PRODUCTS_PER_PAGE = 6;

const ProductsPage = () => {
  const [currPage, setCurrPage] = useState(1);
  const products = useLoaderData() as ProductList;

  const startIndex = (currPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const handleNextPage = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  return (
    <div>
      <ProductsList products={paginatedProducts} />
      <Pagination className="mb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem
              key={index}
              className={currPage === index + 1 ? "bg-zinc-200 rounded-md" : ""}
            >
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                // active={currPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPage;

export const productsLoader = async () => {
  try {
    const res = await ProductsService.getAllProducts();
    console.log(res);
    if (!res.data) {
      throw Error("Error loading products");
    }
    return res.data;
  } catch (err) {
    throw Error("Error loading products");
  }
};
