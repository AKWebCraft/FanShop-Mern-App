import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REISTER
export const register = async (data) => {
  let response;

  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }

  return response;
};

// LOGIN
export const login = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }

  return response;
};

// LOGOUT
export const logout = async () => {
  let response;

  try {
    response = await api.post("/logout");
  } catch (error) {
    return error;
  }

  return response;
};

// UPDATE
export const update = async (data) => {
  let response;

  try {
    response = await api.put("/update", data);
  } catch (error) {
    return error;
  }

  return response;
};

// CREATE CATEGORY
export const createCategory = async (data) => {
  let response;
  try {
    response = await api.post("/createCategory", data);
  } catch (error) {
    return error;
  }

  return response;
};

// GET ALL CATEGORIES
export const getAllCategories = async () => {
  let response;
  try {
    response = await api.get("/allCategories");
  } catch (error) {
    return error;
  }

  return response;
};

// GET CATEGORY
export const getCategory = async (id) => {
  let response;
  try {
    response = await api.get(`/catrgory/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// UPDATE CATEGORY
export const updateCategory = async (data) => {
  let response;
  try {
    response = await api.put("/update", data);
  } catch (error) {
    return error;
  }

  return response;
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  let response;
  try {
    response = await api.delete(`/delete/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// CREATE PRODUCT
export const createProduct = async (data) => {
  let response;
  try {
    response = await api.post("/create/product", data);
  } catch (error) {
    return error;
  }

  return response;
};

// GET ALL PRODUCT
export const getProducts = async () => {
  let response;
  try {
    response = await api.get("/products");
  } catch (error) {
    return error;
  }

  return response;
};

// GET SINGLE PRODUCT
export const getProduct = async (id) => {
  let response;
  try {
    response = await api.get(`/product/details/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// UPDATE PRODUCT
export const updateProduct = async (data) => {
  let response;
  try {
    response = await api.put("/update/product", data);
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

// GET ALL FILTERED PRODUCTS
export const filterProducts = async ({
  category,
  keyword,
  currentPage = 1,
  price,
}) => {
  let response;
  try {
    let link = `/filter/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    if (category) {
      link = `/filter/products?category=${category}&page=${currentPage}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }
    response = await api.get(link);
  } catch (error) {
    return error;
  }
  return response;
};

// ADD TO CART
export const addToCart = async (data) => {
  let response;
  try {
    response = await api.post("/cart", data);
  } catch (error) {
    return error;
  }

  return response;
};

// GET CART ITEMS
export const cartItems = async (id) => {
  let response;
  try {
    response = await api.get(`/cart/items/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

// DELETE CART ITEMS
export const deletecartItems = async (id) => {
  let response;
  try {
    response = await api.get(`/delete/item/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

// CLEAR CART
export const clearCart = async (_id) => {
  let response;
  try {
    response = await api.delete(`/clear/cart/${_id}`);
  } catch (error) {
    return error;
  }
  return response;
};

// CONFIRM ORDER
export const newOrder = async (data) => {
  let response;
  try {
    response = await api.post("/new/order", data);
  } catch (error) {
    return error;
  }
  return response;
};

// GET ORDER
export const getOrders = async () => {
  let response;
  try {
    response = await api.get("/orders");
  } catch (error) {
    return error;
  }
  return response;
};

// CREATE REVIEW
export const createReview = async (data) => {
  let response;
  try {
    response = await api.post("/create/review", data);
  } catch (error) {
    return error;
  }
  return response;
};

// GET REVIEWS
export const getReviews = async (id) => {
  let response;
  try {
    response = await api.get(`/get/reviews/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

// DELETE REVIEWS
export const deleteReviews = async (id) => {
  let response;
  try {
    response = await api.delete(`/delete/reviews/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

/////////   PROJECT REVIEWS  /////////

// CREATE PROJECT REVIEW
export const createProjectReview = async (data) => {
  let response;
  try {
    response = await api.post("/project/review", data);
  } catch (error) {
    return error;
  }
  return response;
};

// GET PROJECT REVIEWS
export const getProjectReviews = async () => {
  let response;
  try {
    response = await api.get("/all/project/reviews");
  } catch (error) {
    return error;
  }
  return response;
};

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    const errorMessage =
      error.response && error.response.data && error.response.data.message;

    if (
      error.response.status === 401 ||
      (error.response.status === 500 && originalReq && !originalReq._isRetry)
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get("http://localhost:5000/refresh", {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
);
