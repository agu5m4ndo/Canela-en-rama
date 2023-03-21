const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  stars: { type: Number },
  userName: { type: String },
  userEmail: { type: String },
  profilePicture: { type: String },
  message: { type: String },
});

const reviewModel = new mongoose.model("review", reviewSchema);
module.exports = {
  reviewModel,
  reviewSchema,
};
