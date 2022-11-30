import { RootState } from "..";
import { Listing } from "../../typed";

export const selectListings = (reduxState: RootState) => {
  return reduxState.listing.listing;
};

export const selectOneListing = (reduxState: RootState) => {
  return reduxState.listing.detailListing;
};

export const selectCategories = (reduxState: RootState) => {
  return reduxState.listing.category;
};
