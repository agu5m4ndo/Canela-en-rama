const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true },
    thumbnail: [{ type: String, required: true }],
    stockPrice: { type: Number, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    category: { type: String, required: true },
    percentage: { type: Number, required: true },
    views: { type: Number, required: true },
    stock: { type: Boolean, required: true },
});

module.exports = new mongoose.model("products", productSchema);