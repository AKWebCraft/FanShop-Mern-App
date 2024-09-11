import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET ALL CATEGORIES
export const getAllcategories = () => api.get("/all/categories");

// CREATE CATEGORY
export const addCategory = (data) => api.post("/create/category", data);

export const addProduct = (data) => api.post("/create/product", data);
export const getAllProducts = () => api.get("/products");

// export const filterProducts = (category) => api.get(`/filter/products?category=${category}`);

//  GET PRODUCT DETAILS
export const productDetail = async (id) => {
  let response;

  try {
    response = await api.get(`/product/details/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

// UPDATE PRODUCT
export const updateProduct = async (id, data) => {
  let response;
  try {
    response = await api.put(`/update/product/${id}`, data);
  } catch (error) {
    return error;
  }

  return response;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  let response;
  try {
    response = await api.delete(`/delete/product/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

// FILTER PRODUCTS
// export const filterProducts = async () => {
//   let response;
//   try {
//     response = await api.get("/filter/products");
//   } catch (error) {
//     return error;
//   }

//   return responsiveArray;
// };
