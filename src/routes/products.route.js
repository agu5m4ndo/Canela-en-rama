const { Router } = require("express"),
  router = Router(),
  {
    getAllProducts,
    getOneProduct,
    createProduct,
    removeProduct,
    editProduct,
    searchProducts,
  } = require("../controllers/products.controller.js"),
  { admin } = require("../middleware/auth.js");

router.route("/").get(getAllProducts).post(createProduct); //debe ser con permisos de admin
router.route("/search").get(searchProducts);
router
  .route("/:code")
  .get(getOneProduct)
  .delete(removeProduct)
  .put(editProduct);

module.exports = router;
