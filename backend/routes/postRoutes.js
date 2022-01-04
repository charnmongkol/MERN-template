const express = require("express");
const { getPosts, createPost } = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//before creating a route, we need to create a model
router.route("/").get(protect, getPosts);
router.route("/create").post(protect, createPost);

// router.route("/:id").get().put().delete();

module.exports = router;
