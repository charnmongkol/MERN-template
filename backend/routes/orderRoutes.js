const express = require("express");
const {
  getOrders,
  createOrder,
  getAllOrders,
} = require("../controllers/orderControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getOrders);
router.route("/create").post(protect, createOrder);
router.route("/allOrders").get(getAllOrders);

// router.route("/:id").get(getOrderById).put(protect, updateOrder).delete(protect, deleteOrder)

module.exports = router;
