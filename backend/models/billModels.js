const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const BillSchema = mongoose.Schema(
  {
    _id: Number,
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

BillSchema.plugin(autoIncrement);
//before save();
// BillSchema.pre("save", function (next) {
//   let doc = this;
//   sequencing
//     .getSequenceNextValue("bill_id")
//     .then((counter) => {
//       console.log("asdasd", counter);
//       if (!counter) {
//         sequencing
//           .insertCounter("bill_id")
//           .then((counter) => {
//             doc._id = counter;
//             console.log(doc);
//             next();
//           })
//           .catch((error) => next(error));
//       } else {
//         doc._id = counter;
//         next();
//       }
//     })
//     .catch((error) => next(error));
// });

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;
