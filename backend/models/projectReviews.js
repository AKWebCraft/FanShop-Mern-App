const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectReviewSchema = new Schema(
  {
    review: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ProjectReview",
  projectReviewSchema,
  "projectReviews"
);
