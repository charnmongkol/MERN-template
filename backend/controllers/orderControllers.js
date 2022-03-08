const Order = require("../models/orderModels");
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id });
  res.json(myOrders);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const allOreders = await Order.find({});
  res.json(allOreders);
});

const createOrder = asyncHandler(async (req, res) => {
  const { firstName, lastName, ppNum, ppExp, isConfirm, deposit } = req.body;

  const order = new Order({
    user: req.user._id,
    firstName,
    lastName,
    ppNum,
    ppExp,
    isConfirm,
    deposit,
    posts,
  });

  const createOrder = await order.save();
  res.status(201).json(createOrder);
});

module.exports = {
  getOrders,
  getAllOrders,
  createOrder,
};
