import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./listing/slice";

const store = configureStore({
  reducer: {
    listing: listingReducer,
  },
});

export default store;
