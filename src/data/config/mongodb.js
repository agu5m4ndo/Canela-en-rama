require("dotenv").config();
const mongoose = require("mongoose");

const connectMongoDb = () => {
  if (mongoose.connection.readyState == 0) {
    mongoose.connect(process.env.CONNECTION_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = { connectMongoDb };
