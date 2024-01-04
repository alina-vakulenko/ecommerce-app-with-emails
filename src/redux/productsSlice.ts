import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductList } from "@/types/product";

interface ProductsState {
  data: ProductList;
}

const initialState: ProductsState = {
  data: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsLoaded: (state, action: PayloadAction<ProductList>) => {
      state.data = action.payload;
    },
  },
});

export const { productsLoaded } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.data;

export default productsSlice.reducer;
