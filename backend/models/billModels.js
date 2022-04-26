const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tourId: {
      type: String,
      required: true,
    },
    tourCode: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancled"],
      default: "pending",
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
    remark: {
      type: String,
      default: "",
    },
    userLog: {
      type: String,
      default: "",
    },
    updatedLog: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
