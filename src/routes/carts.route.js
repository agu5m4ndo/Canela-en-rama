const { Router } = require("express"),
    router = Router(), {
        createCart,
        removeCart,
        getCartProducts,
        removeFromCart,
        updateCart,
        addToCart,
        getAllCarts, //sacar
    } = require("../controllers/carts.controller.js"), { admin, logged } = require("../middleware/auth.js"); //añadir estos

router.route("/").post(createCart).get(getAllCarts); //Sacar el get
router.route("/:id").delete(removeCart);
router.route("/:id/products/").get(getCartProducts);
router
    .route("/:id/products/:id_prod")
    .delete(removeFromCart)
    .put(updateCart)
    .post(addToCart);
module.exports = router;