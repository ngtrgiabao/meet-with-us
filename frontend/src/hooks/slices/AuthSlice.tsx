import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authInitialState {
  userInfo:
    | undefined
    | {
        uid: string;
        email: string;
        name: string;
      };
}

const initialState: authInitialState = {
  userInfo: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        name: string;
        phoneNumber: string;
      }>
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
