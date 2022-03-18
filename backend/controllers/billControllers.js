const Bill = require("../models/billModels");
const asyncHandler = require("express-async-handler");

const getAllBills = asyncHandler(async (req, res) => {
  const allBills = await Bill.find({});

  res.json(allBills);
});

const getMyBills = asyncHandler(async (req, res) => {
  const myBills = await Bill.find({ agent: req.user._id });
  res.json(myBills);
});

const createBill = asyncHandler(async (req, res) => {
  const {
    totalAmount,
    quantityA,
    quantityB,
    quantityC,
    quantityD,
    quantityE,
    status,
    tour,
  } = req.body;

  if (!totalAmount || !tour) {
    res.status(400);
    throw new Error("please fill all the fields");
  } else {
    const newbill = new Bill({
      agent: req.user._id,
      tour,
      totalAmount,
      quantityA,
      quantityB,
      quantityC,
      quantityD,
      quantityE,
    });

    const createBill = await newbill.save();

    res.status(201).json(createBill);
  }
});

module.exports = { getAllBills, getMyBills, createBill };
