import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import currentUserReducer from "../features/currentUser";
import currentUserPostsReducer from "../features/currentUserPostsSlice";
const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    posts: postsReducer,
    currentUserPosts: currentUserPostsReducer,
  },
});

export default store;
