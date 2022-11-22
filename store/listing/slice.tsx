import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { Listing } from "../../typed";

interface ListingState {
  listing: Listing[];
  detailListing: Listing;
}

const initialState: ListingState = {
  listing: [],
  detailListing: {} as Listing,
};

export const listingSlice = createSlice({
  name: "listingSlice",
  initialState,
  reducers: {
    listingFetched: (state, action: PayloadAction<Listing[]>) => {
      //   console.log("listing action payload", action.payload);
      state.listing = [...action.payload];
    },

    selectedListingFetched: (state, action: PayloadAction<Listing>) => {
      state.detailListing = { ...action.payload };
    },
  },
});

export const { listingFetched, selectedListingFetched } = listingSlice.actions;

export default listingSlice.reducer;
