import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/Api";
import axios from "axios";

const apii = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//  CREATE NEW PRODUCT
export const addProduct = createAsyncThunk(
  "newProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.addProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "products/getAllproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  GET PRODUCT DETAILS
// export const productDetail = createAsyncThunk(
//   "product/getProductDetails",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await api.product(id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

//  GET ALL PRODUCTS
export const filterProducts = createAsyncThunk(
  "filter",
  async ({ category, keyword, currentPage = 1, }, { rejectWithValue }) => {
    try {
      let link = `/filter/products?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/filter/products?category=${category}`;
      }
      const response = await apii.get(link);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    product: {},
    newProduct: {},
    filterProduct: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      }),
      builder.addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder.addCase(addProduct.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newProduct = action.payload.newProduct;
      }),
      builder.addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(filterProducts.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(filterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterProduct = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      }),
      builder.addCase(filterProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
