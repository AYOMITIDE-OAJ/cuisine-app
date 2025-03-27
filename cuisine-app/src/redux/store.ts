import { configureStore } from "@reduxjs/toolkit";
import cuisineReducer from "./slices/cuisineSlice";

const store = configureStore({
  reducer: {
    cuisine: cuisineReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export default store;
