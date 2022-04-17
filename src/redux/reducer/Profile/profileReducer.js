import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { data: "" };

export const profileSlice = createSlice({
  name: "profile",
  initialState: { value: initialStateValue },
  reducers: {
    profile: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { profile } = profileSlice.actions;

export default profileSlice.reducer;
