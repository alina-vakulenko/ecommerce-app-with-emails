import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import type { ProductList } from "@/types/product";
import { usePagination } from "./usePagination";
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
import Sidebar from "@/components/Sidebar";

const PRODUCTS_PER_PAGE = 6;

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useLoaderData() as {
    products: ProductList;
    categories: string[];
  };
  const [filteredProducts, setFilteredProducts] =
    useState<ProductList>(products);

  const {
    setCurrPage,
    paginatedItems: paginatedProducts,
    totalPages,
    currPage,
    handleNextPage,
    handlePrevPage,
    handlePageChange,
  } = usePagination({
    perPage: PRODUCTS_PER_PAGE,
    items: filteredProducts,
  });

  useEffect(() => {
    let searchFilterTimeout: ReturnType<typeof setTimeout> | null = null;
    const query = searchParams.get("q");

    const filterProducts = () => {
      searchFilterTimeout && clearTimeout(searchFilterTimeout);
      searchFilterTimeout = setTimeout(() => {
        setCurrPage(1);
        setFilteredProducts((prev) => {
          return prev.filter((product) =>
            product.title.toLowerCase().includes(query.trim().toLowerCase())
          );
        });
      }, 500);
    };

    if (query) {
      filterProducts();
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, setCurrPage, products]);

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

  const handleCategoryClick = (category: string) => {
    setSearchParams((params) => {
      if (category) {
        params.set("category", category.toLowerCase());
      } else {
        params.delete("category");
      }
      return params;
    });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Sidebar
        categories={categories}
        activeCategory={searchParams.get("category")}
        onCategoryClick={handleCategoryClick}
        className="hidden lg:block shadow-lg h-screen"
      />
      <div className="col-span-3">
        <div className="flex flex-col h-[calc(100vh-130px)]">
          <div className="ml-auto flex w-full max-w-sm items-center space-x-2 mb-8">
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
                  className={
                    currPage === index + 1 ? "bg-zinc-200 rounded-md" : ""
                  }
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
      </div>
    </div>
  );
};

export default ProductsPage;
