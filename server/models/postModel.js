import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
});

const Posts = mongoose.model("post", postSchema);

export default Posts;
