const Category = require("../models/category.model");

const categoryController = {
  // CREATE CATEGORY
  async addCategory(req, res, next) {
    const { name, categoryImg } = req.body;
    try {
      if (!name) {
        const error = {
          status: 401,
          message: "Name is required",
        };
        return next(error);
      }
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        const error = {
          status: 401,
          message: "Category Already Exisits",
        };
        return next(error);
      }
      const category = await new Category({
        name,
        categoryImg,
      }).save();
      res.status(201).send({
        category,
      });
    } catch (error) {
      return next(error);
    }
  },

  // GET ALL CATEGORIES
  async allCategories(req, res, next) {
    let apiResponse;
    try {
      apiResponse = await Category.find({});
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ apiResponse });
  },

  //update category
  async updateCategory(req, res, next) {
    const { name, categoryImg, id } = req.body;
    let category;
    try {
      category = await Category.findByIdAndUpdate(
        { _id: id },
        { name, categoryImg },
        { new: true }
      );
    } catch (error) {
      return next(error);
    }
    return res.status(200).send({
      category,
    });
  },

  // single category
  async singleCategory(req, res, next) {
    const { id } = req.params;

    let category;
    try {
      category = await Category.findOne({ _id: id });
    } catch (error) {
      return next(error);
    }
    return res.status(200).send({
      category,
    });
  },

  //delete category
  async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      await Category.findByIdAndDelete({ _id: id });
    } catch (error) {
      return next(error);
    }
    return res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  },
};

module.exports = categoryController;
