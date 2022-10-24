import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const currentUserPostsSlice = createSlice({
  name: "currentUserPosts",
  initialState,
  reducers: {
    currentUserPostsAction: (state, action) => {
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

export const { currentUserPostsAction, createNewPost, removePost, editPost } =
  currentUserPostsSlice.actions;

export default currentUserPostsSlice.reducer;
