import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootPage from "./routes/root";
import ProductsPage, { productsLoader } from "./routes/products";
import ProductDetailsPage, {
  productDetailsLoader,
} from "./routes/productDetails";
import CartPage from "./routes/cart";
import OrderPage from "./routes/order";
import ProductsErrorPage from "./routes/productsError";
import ProductDetailsErrorPage from "./routes/productDetailsError";
import NotFoundPage from "./routes/notFound";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route
        index
        element={<ProductsPage />}
        loader={productsLoader}
        errorElement={<ProductsErrorPage />}
      />
      <Route
        path="products/:id"
        element={<ProductDetailsPage />}
        loader={productDetailsLoader}
        errorElement={<ProductDetailsErrorPage />}
      />
      <Route path="cart" element={<CartPage />} />
      <Route path="order" element={<OrderPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
