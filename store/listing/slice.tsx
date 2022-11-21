import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { Listing } from "../../types";

interface ListingState {
  listing: Listing[];
}

const initialState: ListingState = {
  listing: [],
};

export const listingSlice = createSlice({
  name: "listingSlice",
  initialState,
  reducers: {
    listingFetched: (state, action: PayloadAction<Listing[]>) => {
      //   console.log("listing action payload", action.payload);
      state.listing = [...action.payload];
    },
  },
});

export const { listingFetched } = listingSlice.actions;

export default listingSlice.reducer;
