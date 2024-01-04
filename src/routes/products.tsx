import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import type { ProductList } from "@/types/product";
import ProductsService from "@/api/ProductsService";
import ProductsList from "@/components/ProductsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useLoaderData() as ProductList;
  const [filteredProducts, setFilteredProducts] =
    useState<ProductList>(products);

  const startIndex = (currPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    let filterTimeout: ReturnType<typeof setTimeout> | null = null;

    const filterProducts = () => {
      filterTimeout && clearTimeout(filterTimeout);

      const query = searchParams.get("q");
      filterTimeout = setTimeout(() => {
        setFilteredProducts((prev) =>
          query
            ? prev.filter((p) =>
                p.title.toLowerCase().includes(query.trim().toLowerCase())
              )
            : prev
        );
      }, 500);
    };

    filterProducts();
  }, [searchParams]);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchParams((params) => {
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      return params;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      <div className="flex w-full max-w-sm items-center space-x-2 mb-8">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchParams.get("q") || ""}
          onChange={handleSearch}
        />
        <Button type="submit" aria-label="Search products by name">
          <Search />
        </Button>
      </div>
      {paginatedProducts.length === 0 ? (
        <h2 className="text-center font-semibold text-2xl">
          Products not found
        </h2>
      ) : (
        <ProductsList products={paginatedProducts} />
      )}

      <Pagination className="mt-auto mb-4">
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
