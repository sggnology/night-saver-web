import {configureStore} from "@reduxjs/toolkit";
import {tokenReducer} from "./Auth";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  }
});