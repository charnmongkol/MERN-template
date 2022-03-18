const express = require("express");
const {
  getAllBills,
  createBill,
  getMyBills,
} = require("../controllers/billControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/allBills").get(protect, getAllBills);
router.route("/createBill").post(protect, createBill);
router.route("/myBills").get(protect, getMyBills);

module.exports = router;
