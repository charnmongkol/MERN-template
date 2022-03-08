const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    ppNum: {
      type: String,
    },
    ppExp: {
      type: Date,
    },
    isConfirm: {
      type: Boolean,
      default: false,
    },
    deposit: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    posts: [],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
