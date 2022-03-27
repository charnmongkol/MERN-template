const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  getUsersforAdmin,
  getUserByName,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/allUsers").get(getUsersforAdmin);
router.route("/:id").get(protect, getUserByName);

module.exports = router;
