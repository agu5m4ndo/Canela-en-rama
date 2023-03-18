const MongoDBContainer = require("../containers/MongoDBContainer"),
    productModel = require("../../data/models/product.model.js");
let instance;

class ProductDao extends MongoDBContainer {
    constructor() {
        super(productModel);
    }

    async codeSetter() {
        let code = 0,
            product = " ";
        while (product != null) {
            try {
                product = await super.findOne({ code: `${code}` });
                if (product == null) break;
                code++;
            } catch (error) {
                product = null;
            }
        }
        return code;
    }

    async createProduct(object) {
        const product = new productModel({
            name: object.name,
            code: object.code || this.codeSetter(),
            thumbnail: object.thumbnail,
            stockPrice: object.stockPrice,
            description: object.description,
            tags: object.tags,
            category: object.category,
            percentage: object.percentage,
            views: object.views,
            stock: object.stock,
        });
        await super.create(product);
    }

    async getProductByCode(code) {
        const product = await super.getOne({ code: `${code}` });
        product.views++;
        await super.update({ code: `${code}` }, product);
        return product;
    }

    async deleteProduct(code) {
        await super.delete({ code: `${code}` });
    }

    async updateProduct(object) {
        const newProduct = {
            name: object.name,
            code: object.code,
            thumbnail: object.thumbnail,
            stockPrice: object.stockPrice,
            description: object.description,
            tags: object.tags,
            category: object.category,
            percentage: object.percentage,
            views: object.views,
            stock: object.stock,
        };
        await super.update({ code: `${object.code}` }, newProduct);
    }

    async getMultipleProducts(query) {
        const regex = new RegExp(query, "i");
        const queryBuilder = {
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { tags: { $regex: regex } },
                { category: { $regex: regex } },
            ],
        };
        const products = await super.getMultiple(queryBuilder);
        return products;
    }

    static getInstance() {
        if (!instance) {
            instance = new ProductDao();
            return instance;
        }
    }
}

module.exports = ProductDao;