import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const RootPage = () => {
  return (
    <div>
      <Toaster />
      <header className="mb-16">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootPage;
