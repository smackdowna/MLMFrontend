import {createSlice} from "@reduxjs/toolkit"
import { initialState } from "../initialState"

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userReducer: (state, {payload}) => {
      state.user = {...state.user, ...payload};
    },
    tokenReducer: (state, {payload}) => {
      state.token = {...state.token, ...payload};
    },
  },
})

// USE SELECTOR
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

// EXPORT ACTIONS
export const {userReducer, tokenReducer} = authSlice.actions;

export default authSlice.reducer;
