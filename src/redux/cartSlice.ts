import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductItem } from "@/types/product";

export interface CartItem extends ProductItem {
  quantity: number;
}

type CartState = {
  [productId: number]: CartItem;
};

const initialState: CartState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAdded: (state, action: PayloadAction<ProductItem>) => {
      const quantity = state[action.payload.id]
        ? state[action.payload.id].quantity + 1
        : 1;
      const updatedItem = { ...action.payload, quantity };
      return {
        ...state,
        [action.payload.id]: updatedItem,
      };
    },
    productRemoved: (state, action: PayloadAction<{ id: number }>) => {
      delete state[action.payload.id];
    },
    quantityDecreased: (state, action: PayloadAction<{ id: number }>) => {
      const currQuantity = state[action.payload.id].quantity;
      if (currQuantity === 1) {
        delete state[action.payload.id];
      } else {
        state[action.payload.id].quantity -= 1;
      }
    },
    cartCleared: () => {
      return {};
    },
  },
});

export const { productAdded, productRemoved, cartCleared, quantityDecreased } =
  cartSlice.actions;
export const selectCart = (state: RootState) => {
  const cart = state.cart;

  let totalQuantity = 0;
  let totalPrice = 0;

  for (const itemId in cart) {
    const item = cart[itemId];
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  }

  return { cart, totalQuantity, totalPrice: totalPrice.toFixed(2) };
};

export default cartSlice.reducer;
