const { Router } = require("express"),
  router = Router(),
  products = require("./products.route.js"),
  carts = require("./carts.route.js"),
  orders = require("./orders.route.js"),
  review = require("./review.route.js"),
  checkout = require("./checkout.route.js"),
  profile = require("./profile.route.js"),
  login = require("./login.route.js"),
  logout = require("./logout.route.js"),
  register = require("./register.route.js");

router.use("/api/products", products);
router.use("/api/carts", carts);
router.use("/api/orders", orders);
// router.use("/api/reviews", review);
// router.use("/api/checkout", checkout);
// router.use("/api/profile", profile);
// router.use("/login", login);
// router.use("/logout", logout);
// router.use("/register", register);

module.exports = router;
