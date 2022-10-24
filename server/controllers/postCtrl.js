import Posts from "../models/postModel.js";

const postCtrl = {
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find().sort({ createdAt: -1 });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createPost: async (req, res) => {
    try {
      const { userId, fullname, imageSrc, caption, message, date } = req.body;
      const newPost = new Posts({
        userId,
        fullname,
        imageSrc,
        caption,
        message,
        date,
      });
      await newPost.save();

      res.json({ message: "Post created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ userId: req.user._id }).sort({
        createdAt: -1,
      });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default postCtrl;
