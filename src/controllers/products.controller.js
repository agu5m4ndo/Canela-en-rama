const Factory = require("../persistence/factory");
const productDao = new Factory().selectDao("product");

const createProduct = async(req, res) => {
    const product = req.body;
    await productDao.createProduct(product);
    res.status(201).json({ success: true });
};

const getAllProducts = async(req, res) => {
    const products = await productDao.getAll();
    res.status(200).json({ sucess: true, products });
};

const searchProducts = async(req, res) => {
    const { query } = req.query;
    let products;
    products = await productDao.getMultipleProducts(query);
    if (products.length > 0) {
        res.status(200).json({ success: true, products });
    } else {
        res.status(404).json({
            success: false,
            message: `No match for query '${query}'`,
        });
    }
};

const getOneProduct = async(req, res) => {
    const { code } = req.params;
    let product;
    try {
        product = await productDao.getProductByCode(code);
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No product was found with the associated code '${code}'`,
        });
    }
};

const removeProduct = async(req, res) => {
    const { code } = req.params;
    try {
        await productDao.deleteProduct(code);
        res.status(204).json({ success: true });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No product was found with the associated code '${code}'`,
        });
    }
};

const editProduct = async(req, res) => {
    const product = req.body;
    try {
        await productDao.updateProduct(product);
        res.status(204).json({ success: true });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `No product was found with the associated code '${code}'`,
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    removeProduct,
    editProduct,
    searchProducts,
};