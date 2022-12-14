import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./listing/slice";
import userReducer from "./user/slice";
import requestReducer from "./request/slice";

const store = configureStore({
  reducer: {
    listing: listingReducer,
    user: userReducer,
    request: requestReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
