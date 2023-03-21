const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
  addresses: [
    {
      streetAndNumber: { type: String, required: true },
      floor: { type: String },
      deliveryInstructions: { type: String },
    },
  ],
  purchases: [],
});
