const { Router } = require("express"),
  router = Router(),
  {} = require("../controllers/orders.controller.js"),
  { admin } = require("../middleware/auth.js");

// router.route("/").get();
// router
//   .route("/:id")
//   .get(getOneProduct)
//   .delete(admin, removeProduct)
//   .put(admin, editProduct);

module.exports = router;
