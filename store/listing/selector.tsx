import { RootState } from "..";
import { Listing } from "../../types/";

export const selectListings = (reduxState: RootState) => {
  return reduxState.listing.listing;
};
