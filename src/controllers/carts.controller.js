const Factory = require("../persistence/factory");
const cartDao = new Factory().selectDao("cart");

const createCart = async(req, res) => {
    const cart = await cartDao.createCart();
    res.status(201).json({ success: true, id: cart.id });
};

const removeCart = async(req, res) => {
    await cartDao.deleteCart(Number(req.params["id"]));
    res.status(204).json({ success: true });
};

const getCartProducts = async(req, res) => {
    const products = await cartDao.getCartProducts(Number(req.params["id"]));
    res.status(200).json({ sucess: true, products });
};

const removeFromCart = async(req, res) => {
    const { id, id_prod } = req.params;
    await cartDao.removeFromCart(Number(id), Number(id_prod));
    res.status(204).json({ sucess: true });
};

const updateCart = async(req, res) => {
    const { id, id_prod } = req.params;
    await cartDao.updateCart(Number(id), Number(id_prod));
    res.status(203).json({ sucess: true });
};

const addToCart = async(req, res) => {
    const { id, id_prod } = req.params;
    await cartDao.addToCart(Number(id), Number(id_prod));
    res.status(203).json({ sucess: true });
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