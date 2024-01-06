import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const ProductDetailsErrorPage = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-semibold text-4xl">Oops! An error occurred ☹️</h1>
      <p className="text-3xl">Product not found</p>
      <Link
        to="/"
        className={buttonVariants({
          size: "lg",
        })}
      >
        Explore our products
      </Link>
    </div>
  );
};

export default ProductDetailsErrorPage;
