import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/Api";

//  GET ALL CATEGORIES
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllcategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  CREATE NEW CATREGORY
export const addCategory = createAsyncThunk(
  "category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.addCategory(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    newCategory: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.response;
      }),
      builder.addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
    builder.addCase(addCategory.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.newCategory = action.payload.category;
      }),
      builder.addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
