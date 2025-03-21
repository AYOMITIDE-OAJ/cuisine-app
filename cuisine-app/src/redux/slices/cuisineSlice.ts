import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CuisinesState, SetCuisinesPayload } from "../../interfaces";

const initialState: CuisinesState = {
  page: 1,
  pageSize: 6,
  setMenus: [],
  totalCount: 0,
  guestNumber: 10,
};

const cuisineSlice = createSlice({
  name: "cuisine",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.pageSize += 6;
    },
    setCuisines: (state, action: PayloadAction<SetCuisinesPayload>) => {
      state.setMenus = action.payload.setMenus;
      state.totalCount = action.payload.totalCount;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    incrementGuestNumber: (state) => {
      state.guestNumber += 1;
    },
    decrementGuestNumber: (state) => {
      state.guestNumber = Math.max(1, state.guestNumber - 1);
    },
  },
});

export const {
  incrementPage,
  setCuisines,
  setPageSize,
  incrementGuestNumber,
  decrementGuestNumber,
} = cuisineSlice.actions;

export default cuisineSlice.reducer;
