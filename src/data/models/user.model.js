const mongoose = require("mongoose");
const { reviewSchema } = require("./review.model");

const addressSchema = new mongoose.Schema({
  streetAndNumber: { type: String },
  floor: { type: String },
  deliveryInstructions: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  addresses: [addressSchema],
  cartId: { type: Number, required: true },
  purchases: [
    {
      products: [
        {
          name: { type: String },
          code: { type: Number },
          stockPrice: { type: Number },
          stock: { type: Boolean },
          percentage: { type: Number },
          measurement: { type: String },
          amount: { type: Number },
          id: { type: Number },
        },
      ],
      address: addressSchema,
    },
  ],
  review: reviewSchema,
});

module.exports = new mongoose.model("user", userSchema);
