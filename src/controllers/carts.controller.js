const Factory = require("../persistence/factory");
const cartDao = new Factory().selectDao("cart");
const productDao = new Factory().selectDao("product");

const createCart = async(req, res) => {
    const cart = await cartDao.createCart();
    res.status(201).json({ success: true, id: cart.id });
};

const removeCart = async(req, res) => {
    try {
        await cartDao.deleteCart(Number(req.params["id"]));
        res.status(204).json({ success: true });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No cart was found with the associated id '${req.params.id}'`,
        });
    }
};

const getCartProducts = async(req, res) => {
    try {
        const products = await cartDao.getCartProducts(Number(req.params["id"]));
        res.status(200).json({ sucess: true, products });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No cart was found with the associated id '${req.params.id}'`,
        });
    }
};

const removeFromCart = async(req, res) => {
    const { id, id_prod } = req.params;
    try {
        await cartDao.removeFromCart(Number(id), Number(id_prod));
        res.status(204).json({ sucess: true });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No cart was found with the associated id '${id}'`,
        });
    }
};

const updateCart = async(req, res) => {
    const { id, id_prod } = req.params;
    const { amount } = req.body;
    try {
        await cartDao.updateCartProduct(Number(id), Number(id_prod), amount);
        res.status(203).json({ sucess: true });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No cart was found with the associated id '${id}'`,
        });
    }
};

const addToCart = async(req, res) => {
    const { id, id_prod } = req.params;
    let product, error;
    try {
        product = await productDao.getProductByCode(id_prod);
        product = product.toObject();
        product.amount = Number(req.body["amount"]);
        await cartDao.addToCart(id, product);
        res.status(203).json({ sucess: true });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No cart was found with the associated id '${id}'`,
        });
    }
};

const getAllCarts = async(req, res) => {
    //ELIMINAR ESTE ENDPOINT
    res.status(200).json({ success: true, carts: await cartDao.getAll() });
};

module.exports = {
    createCart,
    removeCart,
    getCartProducts,
    removeFromCart,
    updateCart,
    addToCart,
    getAllCarts,
};