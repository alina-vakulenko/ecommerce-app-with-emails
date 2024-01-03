import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-14 border-b border-zinc-200">
          <NavLink to="/" className="flex z-40 font-semibold">
            Home
          </NavLink>
          {/* TODO add mobile navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <NavLink
                to="/cart"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                <ShoppingCart className="w-4 h-4" />
              </NavLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
