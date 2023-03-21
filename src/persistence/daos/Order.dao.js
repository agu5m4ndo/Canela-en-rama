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
      userEmail: object.email,
      userName: object.name,
      phoneNumber: object.phoneNumber,
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
    const newOrder = {
      number: order.number,
      orderDate: order.orderDate,
      status: order.status,
      stage: order.stage,
      products: order.products,
      userEmail: order.email,
      userName: order.name,
      phoneNumber: order.phoneNumber,
    };
    await super.update({ number: order.number }, newOrder);
  }

  static getInstance() {
    if (instance == null) {
      instance = new OrderDao();
    }
    return instance;
  }
}

module.exports = OrderDao;
