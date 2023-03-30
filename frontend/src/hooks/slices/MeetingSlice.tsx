import { createSlice } from "@reduxjs/toolkit";
import { IToast } from "../../utils/interfaces";

interface meetingInitialState {
  toasts: Array<IToast>;
}

const initialState: meetingInitialState = {
  toasts: [],
};

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { setToasts } = meetingsSlice.actions;