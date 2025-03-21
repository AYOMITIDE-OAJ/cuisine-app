import { configureStore } from "@reduxjs/toolkit";
import cuisineReducer from "./slices/cuisineSlice";

const store = configureStore({
  reducer: {
    cuisine: cuisineReducer,
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
