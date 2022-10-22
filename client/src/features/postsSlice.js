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
    createNewPost: (state, action) => {
      state.value.push(action.payload);
    },
    removePost: (state, action) => {
      state.value = state.value.filter((ad, index) => index !== action.payload);
    },
    editPost: (state, action) => {
      state.value[action.payload.id] = action.payload.value;
    },
  },
});

export const { posts, createNewPost, removePost, editPost } =
  postsSlice.actions;

export default postsSlice.reducer;
