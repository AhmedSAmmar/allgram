import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    currentUserAction: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { currentUserAction } = currentUserSlice.actions;

export default currentUserSlice.reducer;
