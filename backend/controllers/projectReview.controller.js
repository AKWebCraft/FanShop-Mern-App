const ProjectReview = require("../models/projectReviews");
const Joi = require("joi");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const projectReviewController = {
  // CREATE REVIEW
  async createProjectReview(req, res, next) {
    const createReviewSchema = Joi.object({
      review: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = createReviewSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { review, author } = req.body;

    try {
      const newReview = new ProjectReview({
        review,
        author,
      });

      await newReview.save();
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({ message: "Review Submitted" });
  },

  // GET ALL REVIEWS
  async getAllReviews(req, res, next) {
    let reviews;
    try {
      reviews = await ProjectReview.find({}).populate("author");
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ reviews });
  },
};

module.exports = projectReviewController;
