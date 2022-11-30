import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { CategoryType, Listing } from "../../typed";

interface ListingState {
  listing: Listing[];
  detailListing: Listing;
  category: CategoryType[];
}

const initialState: ListingState = {
  listing: [],
  detailListing: {} as Listing,
  category: [],
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

    clearSelectedListing: (state) => {
      state.detailListing = {} as Listing;
    },

    categoriesFetched: (state, action: PayloadAction<CategoryType[]>) => {
      // console.log("category action payload", action.payload);
      state.category = action.payload;
    },

    listingAdded: (state, action: PayloadAction<Listing>) => {
      console.log("addlisting", action.payload);
      state.listing = [...state.listing, action.payload];
    },
  },
});

export const {
  listingFetched,
  selectedListingFetched,
  clearSelectedListing,
  categoriesFetched,
  listingAdded,
} = listingSlice.actions;

export default listingSlice.reducer;
