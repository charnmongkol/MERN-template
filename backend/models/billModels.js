const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tour: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancled"],
    },
    quantityA: {
      type: Number,
      default: 0,
    },
    quantityB: {
      type: Number,
      default: 0,
    },
    quantityC: {
      type: Number,
      default: 0,
    },
    quantityD: {
      type: Number,
      default: 0,
    },
    quantityE: {
      type: Number,
      default: 0,
    },
    quantityF: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
