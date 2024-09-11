const joi = require("joi");
const Product = require("../models/product.model");
const ApiFeatures = require("../utils/apiFeatures");
const ApiPagination = require("../utils/apiPagination");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const productController = {
  // CREATE PRODUCT - ADMIN
  async createProduct(req, res, next) {
    const createProductSchema = joi.object({
      name: joi.string().trim().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      imageUrl: joi.string().required(),
      category: joi.string().required(),
      Stock: joi.number().default(1).required(),
    });

    const { error } = createProductSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { name, description, price, imageUrl, category, Stock } = req.body;

    let newProduct;

    try {
      newProduct = new Product({
        name,
        description,
        price,
        imageUrl,
        category,
        Stock,
      });

      await newProduct.save();
    } catch (error) {
      return next(error);
    }
    return res.status(201).json({ newProduct });
  },

  // GET ALL PRODUCTS
  async getProducts(req, res, next) {
    try {
      const products = await Product.find({}).populate("category");
      res.status(200).json({ products });
    } catch (error) {
      return next(error);
    }
  },

  // UPDATE PRODUCT - ADMIN
  async updateProduct(req, res, next) {
    const updateProductSchema = joi.object({
      id: joi.string().regex(mongodbIdPattern).required(),
      name: joi.string().trim().required(),
      description: joi.string().required(),
      price: joi.number().required(),
      imageUrl: joi.string().required(),
      category: joi.string().required(),
      Stock: joi.number().default(1).required(),
    });

    const { error } = updateProductSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { id, name, description, price, imageUrl, category, Stock } =
      req.body;

    let updateProduct;
    try {
      updateProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
          name,
          description,
          price,
          imageUrl,
          category,
          Stock,
        },
        { new: true }
      );
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ updateProduct });
  },

  // DELETE PRODUCT -ADMIN
  async deleteProduct(req, res, next) {
    const deleteProductSchema = joi.object({
      id: joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = deleteProductSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    try {
      await Product.deleteOne({ _id: id });
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ message: "product deleted succcessfully" });
  },

  // GET SINGLE PRODUCT
  async getSingleProduct(req, res, next) {
    const singleProductSchema = joi.object({
      id: joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = singleProductSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    let product;
    try {
      product = await Product.findById({ _id: id }).populate("category");
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ product });
  },

  // FILTER PRODUCTS CONTROLLER
  async filterProducts(req, res, next) {
    const resultPerPage = 4;
    let products;
    try {
      const productsCount = await Product.countDocuments();
      const apiFeatures = new ApiFeatures(
        Product.find({}).populate("category"),
        req.query
      )
        .search()
        .filter();

      products = await apiFeatures.query;
      let filteredProductsCount = products.length;

      const apiPagination = new ApiPagination(
        Product.find({}).populate("category"),
        req.query
      )
        .search()
        .filter()
        .pagination(resultPerPage);

      products = await apiPagination.quertResult;

      res.status(200).json({
        products,
        productsCount,
        filteredProductsCount,
        resultPerPage,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = productController;
