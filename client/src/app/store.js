import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import currentUserReducer from "../features/currentUser";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    posts: postsReducer,
  },
});

export default store;
