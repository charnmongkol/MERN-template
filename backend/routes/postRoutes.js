const express = require("express");
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPosts,
  getTourByCode,
  updateSeat,
  updateIsSale,
  updateIsHighlight,
  getHighlightPosts,
} = require("../controllers/postControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//before creating a route, we need to create a model
router.route("/").get(protect, getPosts);
router.route("/create").post(protect, createPost);
router.route("/allPosts").get(getAllPosts);
router.route("/highlightPosts").get(getHighlightPosts);

router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route("/tours/:tourCode").get(getTourByCode);
router.route("/updateSeats/:id").put(protect, updateSeat);
router.route("/updateIsSale/:id").put(protect, updateIsSale);
router.route("/updateIsHighlight/:id").put(protect, updateIsHighlight);

module.exports = router;
