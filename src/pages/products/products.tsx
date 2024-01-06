import { Suspense } from "react";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import type { ProductList } from "@/types/product";
import type { Category } from "@/types/category";
import Sidebar from "@/components/Sidebar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CategoriesSelect from "./components/CategoriesSelect";
import ProductsContent from "./components/ProductsContent";
import ProoductsListSkeleton from "./components/ProoductsListSkeleton";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useLoaderData() as {
    products: ProductList;
    categories: Category[];
  };

  const handleCategoryClick = (category: Category) => {
    setSearchParams((params) => {
      if (category && category !== "all") {
        params.set("category", category.toLowerCase());
      } else {
        params.delete("category");
      }
      return params;
    });
  };

  return (
    <div className="grid gap-4 grid-cols-auto place-content-center lg:grid-cols-[0.7fr_4fr]">
      <Sidebar
        categories={categories}
        activeCategory={searchParams.get("category")}
        onCategoryClick={handleCategoryClick}
        className="hidden lg:block lg:col-span-1 shadow-lg"
      />

      <MaxWidthWrapper className="md:px-2.5 lg:pr-20 my-8 min-h-[85vh] flex flex-col">
        <div className="mx-auto mb-8 w-full max-w-sm">
          <CategoriesSelect
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <Suspense fallback={<ProoductsListSkeleton />}>
          <Await resolve={products}>
            <ProductsContent />
          </Await>
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductsPage;
