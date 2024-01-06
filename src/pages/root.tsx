import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import { Toaster } from "@/components/ui/toaster";

const RootPage = () => {
  return (
    <div>
      <Toaster />
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootPage;
