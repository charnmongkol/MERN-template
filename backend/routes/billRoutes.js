const express = require("express");
const {
  getAllBills,
  createBill,
  getMyBills,
  getBillById,
  updateStatusBill,
} = require("../controllers/billControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/allBills").get(protect, getAllBills);
router.route("/createBill").post(protect, createBill);
router.route("/myBills").get(protect, getMyBills);
router.route("/:id").get(protect, getBillById);
router.route("/updateStatusBill/:id").put(protect, updateStatusBill);

module.exports = router;
