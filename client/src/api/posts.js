import axios from "axios";
import store from "../app/store";
import { posts, createNewPost } from "../features/postsSlice";

export const createPost = async (
  userId,
  imageSrc,
  caption,
  loading,
  error,
  token
) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/api/posts",
      data: {
        userId: userId,
        imageSrc: imageSrc,
        caption: caption,
      },
      withCredentials: true,
      headers: { Authorization: token },
    });
    // store.dispatch(
    //   createNewPost({
    //     userId: userId,
    //     imageSrc: imageSrc,
    //     caption: caption,
    //   })
    // );
    loading(false);
  } catch (err) {
    const errorMessage = err.response.data.message;
    if (errorMessage) {
      error(errorMessage);
    } else {
      error(err.message);
    }

    loading(false);
  }
};

export const getPosts = async (loading, error, token) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:5000/api/posts",
      withCredentials: true,
      headers: { Authorization: token },
    });
    store.dispatch(posts(response.data));
    loading(false);
  } catch (err) {
    const errorMessage = err.response.data.message;
    if (errorMessage) {
      error(errorMessage);
    } else {
      error(err.message);
    }

    loading(false);
  }
};
