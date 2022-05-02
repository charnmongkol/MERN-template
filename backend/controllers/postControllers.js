const Post = require("../models/postModels");
const asyncHandler = require("express-async-handler");
const { post } = require("../routes/postRoutes");

// const getAllPosts = asyncHandler(async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;

//   try {
//     let posts;
//     if (qNew) {
//       posts = await Post.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       posts = await Post.find({
//         category: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       posts = await Post.find();
//     }

//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
const getAllPosts = asyncHandler(async (req, res) => {
  const allposts = await Post.find({});
  const filterIsSale = (data) => {
    return data.filter((item) => item.isSale === true);
  };
  res.json(filterIsSale(allposts));
});

const getPosts = asyncHandler(async (req, res) => {
  //mongodb query
  const posts = await Post.find({ user: req.user._id });
  res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const {
    tourName,
    tourCode,
    highlight,
    country,
    startAt,
    endAt,
    commission,
    comSales,
    seatsCl,
    seatsGu,
    seatsAval,
    pdfFile,
    wordFile,
    featuredImage,
    priceA,
    priceB,
    priceC,
    priceD,
    priceE,
    priceF,
    isSale,
  } = req.body;

  if (!tourName || !tourCode) {
    res.status(400);
    throw new Error("please fill all the feilds");
  } else {
    const post = new Post({
      user: req.user._id,
      tourName,
      tourCode,
      highlight,
      country,
      startAt,
      endAt,
      commission,
      comSales,
      seatsCl,
      seatsGu,
      seatsAval,
      pdfFile,
      wordFile,
      featuredImage,
      priceA,
      priceB,
      priceC,
      priceD,
      priceE,
      priceF,
      isSale,
    });

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
    res.status(404).json({ message: "Post is not found!" });
  }
});

const getTourByCode = asyncHandler(async (req, res) => {
  const posts = await Post.find({ tourCode: req.params.tourCode });

  const filterIsSale = (data) => {
    return data.filter((item) => item.isSale === true);
  };

  if (posts) {
    res.json(filterIsSale(posts));
  } else {
    res.status(404).json({ message: "this code is not found!" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const {
    tourName,
    tourCode,
    highlight,
    country,
    startAt,
    endAt,
    commission,
    comSales,
    seatsCl,
    seatsGu,
    pdfFile,
    wordFile,
    featuredImage,
    priceA,
    priceB,
    priceC,
    priceD,
    priceE,
    priceF,
  } = req.body;

  const post = await Post.findById(req.params.id);

  //post = user id
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (post) {
    post.tourName = tourName;
    post.tourCode = tourCode;
    post.highlight = highlight;
    post.country = country;
    post.startAt = startAt;
    post.endAt = endAt;
    post.commission = commission;
    post.comSales = comSales;
    post.seatsCl = seatsCl;
    post.seatsGu = seatsGu;
    post.pdfFile = pdfFile;
    post.wordFile = wordFile;
    post.featuredImage = featuredImage;
    post.priceA = priceA;
    post.priceB = priceB;
    post.priceC = priceC;
    post.priceD = priceD;
    post.priceE = priceE;
    post.priceF = priceF;

    const updatedPost = await post.save();
    res.json(updatedPost);
  }
});

const updateSeat = asyncHandler(async (req, res) => {
  const { seatsAval } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.seatsAval = seatsAval;
    const updateTourSeat = await post.save();
    res.json(updateTourSeat);
  } else {
    res.status(404).json({ message: "cannot update seat!" });
  }
});

const updateIsHighlight = asyncHandler(async (req, res) => {
  const { isHighlight } = req.body;
  const highlight = await Post.findById(req.params.id);

  if (highlight) {
    highlight.isHighlight = isHighlight;
    const updateHighlight = await highlight.save();
    res.json(updateHighlight);
  } else {
    res.status(404).json({ message: "cannot update highlight!" });
  }
});

const updateIsSale = asyncHandler(async (req, res) => {
  const { isSale } = req.body;
  const sale = await Post.findById(req.params.id);

  if (sale) {
    sale.isSale = isSale;
    const updateSale = await sale.save();
    res.json(updateSale);
  } else {
    res.status(404).json({ message: "cannot update sale!" });
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

module.exports = {
  getAllPosts,
  getPosts,
  createPost,
  getPostById,
  getTourByCode,
  updatePost,
  updateSeat,
  updateIsHighlight,
  updateIsSale,
  deletePost,
};
