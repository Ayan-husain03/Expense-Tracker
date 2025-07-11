import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: () => {},
    login: () => {},
    logout: () => {},
  },
});
