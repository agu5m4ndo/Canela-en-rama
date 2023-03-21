const { Router } = require("express"),
  router = Router(),
  {
    createOrder,
    editOrder,
    getAllOrders,
    getOneOrder,
    removeOrder,
    searchOrders,
  } = require("../controllers/orders.controller.js"),
  { admin } = require("../middleware/auth.js");

router.route("/").get(getAllOrders).post(createOrder);
router.route("/search").get(searchOrders);
router
  .route("/:number")
  .get(getOneOrder)
  .delete(removeOrder) //admin
  .put(editOrder); //admin

module.exports = router;
