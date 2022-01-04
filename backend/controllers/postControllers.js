const Post = require("../models/postModels");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  //mongodb query
  const posts = await Post.find({ user: req.user._id });
  res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("please fill all the feilds");
  } else {
    const post = new Post({ user: req.user._id, title, content, category });

    //save to db
    const createPost = await post.save();

    res.status(201).json(createPost);
  }
});

const getPostById = asyncHandler(async (req, res) => {
  //check post id in params in path
  const post = await Post.findById(req.params.id);

  //if I get the post back from id
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post is not found" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const post = await Post.findById(req.params.id);

  //post = user id
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform thi action");
  }
  if (post) {
    post.title = title;
    post.cntent = content;
    post.category = category;

    const updatedPost = await post.save();
    res.json(updatedPost);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can'tperform this action");
  }

  if (post) {
    await post.remove();
    res.json({ message: "Post removed!" });
  } else {
    res.status(404);
    throw new Error("Post is not found");
  }
});

module.exports = { getPosts, createPost, getPostById, updatePost, deletePost };
