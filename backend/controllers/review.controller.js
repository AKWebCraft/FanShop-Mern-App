const Review = require("../models/review.model");
const Joi = require("joi");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const reviewController = {
  // CREATE REVIEW
  async createReview(req, res, next) {
    const createReviewSchema = Joi.object({
      review: Joi.string().required(),
      product: Joi.string().regex(mongodbIdPattern).required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = createReviewSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { review, author, product } = req.body;

    try {
      const newReview = new Review({
        review,
        author,
        product,
      });

      await newReview.save();
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({ message: "comment created" });
  },

  // GET REVIEWS BY ID
  async getById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    let reviews;
    let reviewsCount;
    try {
      reviews = await Review.find({ product: id }).populate("author");
      reviewsCount = reviews.length;
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ reviews, reviewsCount });
  },

  // CLEAR REVIEWS
  async deleteReviews(req, res, next) {
    const { id } = req.params;
    try {
      await Review.deleteMany({ product: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: " All Reviews has been cleared" });
  },
};

module.exports = reviewController;
