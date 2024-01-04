import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { Toaster } from "@/components/ui/toaster";

const RootPage = () => {
  return (
    <div>
      <Toaster />
      <header className="mb-16">
        <Navbar />
      </header>
      <main>
        {/* <MaxWidthWrapper> */}
        <Outlet />
        {/* </MaxWidthWrapper> */}
      </main>
    </div>
  );
};

export default RootPage;