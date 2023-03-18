const ProductDaoMongo = require("./daos/Product.dao"),
  CartDaoMongo = require("./daos/Cart.dao"),
  daoContainer = {
    product: ProductDaoMongo,
    cart: CartDaoMongo,
  };

class Factory {
  selectDao(type) {
    return daoContainer[type].getInstance();
  }
}

module.exports = Factory;
