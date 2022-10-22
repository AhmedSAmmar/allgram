import Posts from "../models/postModel.js";

const postCtrl = {
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find();

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createPost: async (req, res) => {
    try {
      const { imageSrc, caption } = req.body;
      const newPost = new Posts({ userId: req.user._id, imageSrc, caption });
      await newPost.save();

      res.json({ message: "Post created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ userId: req.user._id });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default postCtrl;
