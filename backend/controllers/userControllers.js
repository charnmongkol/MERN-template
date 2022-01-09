const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken");

// registration
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  //check duplicate email = user is existing
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //if not exists, create a new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }

  res.json({
    name,
    email,
  });
});

// Log in
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find email
  const user = await User.findOne({ email });

  //if success
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Pssword!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // need user id
  const user = await User.findById(req.user._id);
  //if user exists
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    //if the body contains password, only then we can update
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    //send information to frontend
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
