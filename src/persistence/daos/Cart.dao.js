const MongoDBContainer = require("../containers/MongoDBContainer"),
    cartModel = require("../../data/models/cart.model.js");
let instance;

class CartDao extends MongoDBContainer {
    constructor() {
        super(cartModel);
    }

    async idSetter() {
        let id = 1,
            cart = " ";
        while (cart != null) {
            try {
                cart = await super.getOne({ id: `${id}` });
                if (cart == null) break;
                id++;
            } catch (error) {
                cart = null;
            }
        }
        return id;
    }

    async createCart() {
        const cart = new cartModel({
            id: await this.idSetter(),
            creationDate: new Date(),
            products: [],
        });
        await super.create(cart);
        return cart;
    }

    async getCartProducts(id) {
        const cart = await super.getOne({ id: `${id}` });
        return cart.products;
    }

    async deleteCart(id) {
        await super.delete({ id: `${id}` });
    }

    async addToCart(id, product) {
        const cart = await super.getOne({ id: `${id}` });
        const index = cart.products.findIndex((prod) => {
            return prod.code === product.code;
        });
        if (index >= 0) {
            cart.products[index].amount += product.amount;
        } else {
            product.id = cart.products.length;
            cart.products.push(product);
        }
        return await super.update({ id: `${id}` }, cart);
    }

    async removeFromCart(id, idProd) {
        const cart = await super.getOne({ id: `${id}` });
        if (cart.products[idProd]) {
            cart.products.splice(idProd, 1);
            let i = 0;
            cart.products.forEach((product) => {
                product.id = i;
                i++;
            });
        }
        await super.update({ id: `${id}` }, cart);
    }

    async updateCartProduct(id, idProd, amount) {
        const cart = await super.getOne({ id: `${id}` });
        if (cart.products[idProd]) {
            cart.products[idProd].amount = amount;
        }
        return await super.update({ id: `${id}` }, cart);
    }

    static getInstance() {
        if (!instance) {
            instance = new CartDao();
            return instance;
        }
    }
}

module.exports = CartDao;