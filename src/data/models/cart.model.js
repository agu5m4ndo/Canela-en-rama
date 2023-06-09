const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    products: [{
        name: { type: String, required: true },
        code: { type: Number, required: true },
        price: { type: Number, required: true },
        stock: { type: Boolean, required: true },
        measurement: { type: String, required: true },
        amount: { type: Number, required: true },
        id: { type: Number, required: true },
    }, ],
});

module.exports = new mongoose.model("cart", cartSchema);