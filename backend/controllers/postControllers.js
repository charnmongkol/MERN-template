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

module.exports = { getPosts, createPost };
