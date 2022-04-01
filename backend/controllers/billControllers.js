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

const getBillById = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id);

  if (bill) {
    res.json(bill);
  } else {
    res.status(404).json({ message: "Bill is not found" });
  }
});

const createBill = asyncHandler(async (req, res) => {
  const {
    totalAmount,
    quantityA,
    quantityB,
    quantityC,
    quantityD,
    quantityE,
    quantityF,
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
      quantityF,
    });

    const createBill = await newbill.save();

    res.status(201).json(createBill);
  }
});

const updateStatusBill = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const bill = await Bill.findById(req.params.id);

  if (bill) {
    bill.status = status;

    const updatedBill = await bill.save();
    res.json(updatedBill);
  }
});

module.exports = {
  getAllBills,
  getMyBills,
  getBillById,
  createBill,
  updateStatusBill,
};
