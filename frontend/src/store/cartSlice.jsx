import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const allCartItems = action.payload;

      state.cart = allCartItems;
    },
    reSetCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { setCart, reSetCart } = userSlice.actions;
export default userSlice.reducer;
