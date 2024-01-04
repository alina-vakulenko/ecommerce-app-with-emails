import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EmptyCartPage = () => {
  return (
    <div className="h-[300px] sm:h-[500px] px-5 flex flex-col items-center justify-center mx-auto gap-8 sm:gap-10s my-12 text-center">
      <h2 className="text-muted-foreground text-2xl sm:text-5xl">
        Your shopping cart is currently empty.
      </h2>
      <p className="text-muted-foreground text-xl sm:text-3xl">
        Browse our products and add items to your cart.
      </p>
      <Link to="/" className={cn(buttonVariants(), "text-lg p-6")}>
        Explore Products
      </Link>
    </div>
  );
};

export default EmptyCartPage;
