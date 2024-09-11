const express = require("express");
const userController = require("../controllers/user.controller");
const categoryController = require("../controllers/category.controller");
const auth = require("../middlewares/auth");
const productController = require("../controllers/product.controller");
const cartController = require("../controllers/cart.controller");
const orderController = require("../controllers/order.controller");
const reviewController = require("../controllers/review.controller");
const projectReviewController = require("../controllers/projectReview.controller");
const router = express.Router();

//////// AUTH ROUTES ////////

// REGISTER
router.post("/register", userController.register);

// LOGIN
router.post("/login", userController.login);

// LOGOUT
router.post("/logout", auth, userController.logout);

// REFRESH
router.get("/refresh", userController.refresh);

// UPDATE
router.put("/update", auth, userController.update);

/////// CATEGORY ROUTES ///////

// CREATE CATEGORY
router.post("/createCategory", auth, categoryController.addCategory);

// GET ALL CATEGORIES
router.get("/allCategories", categoryController.allCategories);

// GET SINGLE CATEGORY
router.get("/catrgory/:id", categoryController.singleCategory);

// UPDATE CATEGORY
router.put("/update", auth, categoryController.updateCategory);

// DELETE CATEGORY
router.delete("/delete/:id", auth, categoryController.deleteCategory);

/////// PRODUCT ROUTES ///////

//  CREATE PRODUCT
router.post("/create/product", productController.createProduct);

// GET ALL PRODUCTS
router.get("/products", productController.getProducts);

// UPDATE PRODUCT
router.put("/update/product", productController.updateProduct);

// DELETE PRODUCT
router.delete("/delete/product/:id", productController.deleteProduct);

// GET SINGLE PRODUCT
router.get("/product/details/:id", productController.getSingleProduct);

// FILTER PRODUCTS
router.get("/filter/products", productController.filterProducts);

/////// CART ROUTES ///////

// ADD ITME TO CART
router.post("/cart", cartController.addItemToCart);

// GET CART ITEMS
router.get("/cart/items/:id", cartController.getCartItems);

// DELETE CART ITEM
router.get("/delete/item/:id", cartController.deleteCartItems);

// CLEAR CART
router.delete("/clear/cart/:_id", cartController.clearCart);

//// ORDER ROUTES ///

// NEW ORDER
router.post("/new/order", orderController.confirmOrder);

// GET ORDER
router.get("/orders", orderController.getConfirmOrder);

///// REVIEWS ROUTES /////

// CREATE REVIEW
router.post("/create/review", auth, reviewController.createReview);

// GET REVIEWS BY ID
router.get("/get/reviews/:id", reviewController.getById);

// DELETE REVIEWS
router.delete("/delete/reviews/:id", reviewController.deleteReviews);

///// PROJECT REVIEWS  ///////

// POST PROJECT REVIEW
router.post(
  "/project/review",
  auth,
  projectReviewController.createProjectReview
);

// GET ALL PROJECT REVIEWS
router.get("/all/project/reviews", projectReviewController.getAllReviews);

module.exports = router;
