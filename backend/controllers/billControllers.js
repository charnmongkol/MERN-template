const Bill = require("../models/billModels");
const asyncHandler = require("express-async-handler");
const notifyLine = require("../utils/notify");

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
    tourId,
    tourName,
    tourCode,
    startAt,
    remark,
  } = req.body;

  const cur = new Date();

  if (!totalAmount || !tourCode) {
    res.status(400);
    throw new Error("please fill all the fields");
  } else {
    const newbill = new Bill({
      agent: req.user._id,
      tourId,
      tourName,
      tourCode,
      startAt,
      totalAmount,
      quantityA,
      quantityB,
      quantityC,
      quantityD,
      quantityE,
      quantityF,
      remark,
    });

    const createBill = await newbill.save();

    res.status(201).json(createBill);
    if (createBill) {
      notifyLine(
        `agent ${req.user.name} ทำการจองทัวร์ "${tourName}" => เมื่อ ${cur}`
      );
    }
  }
});

const updateStatusBill = asyncHandler(async (req, res) => {
  const { status, remark } = req.body;
  const bill = await Bill.findById(req.params.id);
  const cur = new Date();

  if (bill) {
    bill.status = status;
    bill.remark = remark;

    const updatedBill = await bill.save();
    res.json(updatedBill);
    if (updatedBill) {
      notifyLine(
        `${req.user.name} เปลี่ยน status ของการจองหมายเลข${req.params.id} เป็น "${status}" => เมื่อ ${cur}`
      );
    }
  }
});

module.exports = {
  getAllBills,
  getMyBills,
  getBillById,
  createBill,
  updateStatusBill,
};
