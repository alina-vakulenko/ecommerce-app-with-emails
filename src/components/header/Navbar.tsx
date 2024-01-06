import { ShoppingCart, Home, ShoppingBag } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectCart } from "@/redux/cartSlice";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import ProductsSearchInput from "@/components/header/ProductsSearchInput";

const Navbar = () => {
  const { totalQuantity } = useAppSelector(selectCart);
  const { pathname } = useLocation();
  const showSearchInput = pathname === "/";

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-14 border-b border-zinc-200">
          <NavLink
            to="/"
            className={buttonVariants({
              size: "icon",
            })}
          >
            {<ShoppingBag />}
          </NavLink>
          <div className="flex items-center space-x-2">
            {showSearchInput ? <ProductsSearchInput /> : null}
            <NavLink
              to="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <Home className="w-6 h-6" />
            </NavLink>
            <NavLink
              to="/cart"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "relative",
              })}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalQuantity > 0 ? (
                <div className="absolute top-0 right-1 text-[10px] bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                  {totalQuantity}
                </div>
              ) : null}
            </NavLink>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
