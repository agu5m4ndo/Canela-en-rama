const Factory = require("../persistence/factory");
const orderDao = new Factory().selectDao("order");

const createOrder = async (req, res) => {
  const order = req.body;
  const value = await orderDao.createOrder(order);
  res.status(201).json({ success: true, number: value });
};

const getAllOrders = async (req, res) => {
  const orders = await orderDao.getAll();
  res.status(200).json({ sucess: true, orders });
};

const searchOrders = async (req, res) => {
  const { email } = req.query;
  let orders;
  orders = await orderDao.getMultipleOrders(email);
  if (orders.length > 0) {
    res.status(200).json({ success: true, orders });
  } else {
    res.status(404).json({
      success: false,
      message: `No match for email '${email}'`,
    });
  }
};

const getOneOrder = async (req, res) => {
  const { number } = req.params;
  let order;
  try {
    order = await orderDao.getOrderByNumber(number);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `No order was found with the associated number '${number}'`,
    });
  }
};

const removeOrder = async (req, res) => {
  const { number } = req.params;
  try {
    await orderDao.deleteOrder(number);
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `No order was found with the associated number '${number}'`,
    });
  }
};

const editOrder = async (req, res) => {
  const order = req.body;
  try {
    await orderDao.updateOrder(order);
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `No order was found with the associated code '${code}'`,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOneOrder,
  removeOrder,
  editOrder,
  searchOrders,
};
