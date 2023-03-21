const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  stars: { type: Number, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  profilePicture: { type: String, required: true },
  message: { type: String },
});

module.exports = new mongoose.model("review", reviewSchema);
