const MongoDBContainer = require("../containers/MongoDBContainer");
const orderModel = require("../../data/models/order.model");
let instance;

class OrderDao extends MongoDBContainer {
  constructor() {
    super(orderModel);
  }

  async createOrder(object) {
    const order = new orderModel({
      number: (await super.getAll()).length + 1,
      orderDate: new Date(),
      status: "new",
      stage: "waiting",
      products: [...object.products],
      ...object,
    });
    await super.create(order);
    return order.number;
  }

  async getOrderByNumber(number) {
    return await super.getOne({ number: `${number}` });
  }

  //It's not supposed to delete the order
  async deleteOrder(number) {
    await super.delete({ number: `${number}` });
  }

  async getMultipleOrders(email) {
    return await super.getMultiple({ userEmail: `${email}` });
  }

  async updateOrder(order) {
    await super.update({ number: order.number }, { $set: order });
  }

  static getInstance() {
    if (instance == null) {
      instance = new OrderDao();
    }
    return instance;
  }
}

module.exports = OrderDao;
