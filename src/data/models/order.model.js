const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, required: true },
  stage: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      code: { type: Number, required: true },
      stockPrice: { type: Number, required: true },
      stock: { type: Boolean, required: true },
      measurement: { type: String, required: true },
      amount: { type: Number, required: true },
      id: { type: Number, required: true },
    },
  ],
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
});

module.exports = mongoose.model("order", orderSchema);
