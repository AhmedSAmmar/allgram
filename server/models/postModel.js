import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("post", postSchema);

export default Posts;
