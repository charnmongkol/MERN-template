const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    tourName: {
      type: String,
      required: true,
    },
    tourCode: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: false,
    },
    country: {
      type: [String],
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    comSales: {
      type: Number,
      required: true,
    },
    seatsCl: {
      type: Number,
      required: true,
    },
    seatsGu: {
      type: Number,
      required: true,
    },
    pdfFile: {
      type: String,
      required: false,
    },
    wordFile: {
      type: String,
      required: false,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    priceA: {
      type: Number,
      required: true,
    },
    priceB: {
      type: Number,
      required: true,
    },
    priceC: {
      type: Number,
      required: true,
    },
    priceD: {
      type: Number,
      required: true,
    },
    priceE: {
      type: Number,
      required: true,
    },
    priceF: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
