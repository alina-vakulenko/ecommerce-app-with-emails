import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import { Toaster } from "@/components/ui/toaster";

const RootPage = () => {
  return (
    <div>
      <Toaster />
      <header className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootPage;
