const express = require("express");
const router = require("./src/routes/index.routes");
const app = express();
require("dotenv").config();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(`${PORT}`, () => {
  console.log(`Server running on port ${PORT}`);
});
