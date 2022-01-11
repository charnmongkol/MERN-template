//define data type
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    licenseStart: {
      type: Date,
      required: true,
    },
    licenseEnd: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

//encrypt password
userSchema.pre("save", async function (next) {
  //check password is not modify, go next operation
  if (!this.isModified("password")) {
    next();
  }
  //more number = more difficult
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

//matchin input password & password in database
userSchema.methods.matchPassword = async function (enteredPassord) {
  return await bcrypt.compare(enteredPassord, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
