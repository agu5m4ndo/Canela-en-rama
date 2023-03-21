const ProductDaoMongo = require("./daos/Product.dao"),
  CartDaoMongo = require("./daos/Cart.dao"),
  OrderDaoMongo = require("./daos/Order.dao"),
  ReviewDaoMongo = require("./daos/Review.dao"),
  daoContainer = {
    product: ProductDaoMongo,
    cart: CartDaoMongo,
    order: OrderDaoMongo,
    review: ReviewDaoMongo,
  };

class Factory {
  selectDao(type) {
    return daoContainer[type].getInstance();
  }
}

module.exports = Factory;
