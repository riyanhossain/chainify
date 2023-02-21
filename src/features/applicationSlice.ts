import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// this is from previous code, useless for this version of the app but I'm keeping it for now 


const initialState = {
  isModalOpen: false,
};

// Slice is a collection of reducers and actions for a single feature of the application =

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setIsModalOpen } = applicationSlice.actions;

export default applicationSlice.reducer;
