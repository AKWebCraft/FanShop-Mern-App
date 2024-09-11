import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import products from "./productSlice";
import categories from "./categorySlice"

const store = configureStore({
  reducer: {
    products,
    categories,
  },
});

export default store;
