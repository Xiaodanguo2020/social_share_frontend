import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { CategoryType, Listing, Request } from "../../typed";

interface RequestState {
  request: Request[];
}

const initialState: RequestState = {
  request: [],
};

export const listingSlice = createSlice({
  name: "listingSlice",
  initialState,
  reducers: {
    requestsFetched: (state, action: PayloadAction<Request[]>) => {
      console.log("request action", action.payload);
      state.request = [...action.payload];
    },
  },
});

export const { requestsFetched } = listingSlice.actions;

export default listingSlice.reducer;
