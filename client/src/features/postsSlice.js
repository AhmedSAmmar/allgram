import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    posts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { posts, createNewPost, removePost, editPost } =
  postsSlice.actions;

export default postsSlice.reducer;
