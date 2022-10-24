import axios from "axios";
import store from "../app/store";
import { currentUserPostsAction } from "../features/currentUserPostsSlice";
import { posts, createNewPost } from "../features/postsSlice";

export const createPost = async (
  userId,
  fullname,
  imageSrc,
  caption,
  message,
  date,
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
        fullname: fullname,
        imageSrc: imageSrc,
        caption: caption,
        message: message,
        date: date,
      },
      withCredentials: true,
      headers: { Authorization: token },
    });
    store.dispatch(
      createNewPost({
        userId: userId,
        fullname,
        imageSrc: imageSrc,
        caption: caption,
        message: message,
        date: date,
      })
    );
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

export const getCurrentUserPosts = async (loading, error, token) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:5000/api/userPosts",
      withCredentials: true,
      headers: { Authorization: token },
    });
    store.dispatch(currentUserPostsAction(response.data));
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
