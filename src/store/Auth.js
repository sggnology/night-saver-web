import {createSlice} from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    authenticated: false,
    token: null,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.token = action.payload;
    },
    REMOVE_TOKEN: (state) => {
      state.authenticated = false;
      state.token = null;
    }
  }
});

export const {SET_TOKEN, REMOVE_TOKEN} = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;