import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./productsSlice";
import CartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    products: ProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
