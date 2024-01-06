import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import RootPage from "./pages/root";
import ProductsPage from "./pages/products/products";
import ProductDetailsPage from "./pages/product-details/productDetails";
import CartPage from "./pages/cart/cart";
import OrderPage from "./pages/order/order";
import ProductsErrorPage from "./pages/products/productsError";
import ProductDetailsErrorPage from "./pages/product-details/productDetailsError";
import NotFoundPage from "./pages/notFound";

import { store } from "./redux/store";
import { productsLoader } from "./pages/products/dataLoader";
import { productDetailsLoader } from "./pages/product-details/dataLoader";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
