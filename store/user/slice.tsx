import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  UserType,
  MyRequests,
  Request,
  EnrichedRequest,
  EnrichedListing,
} from "../../typed";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
  token: string | null;
  userProfile: UserType;
  errorMessage: string;
  myRequests: EnrichedRequest[];
  myListings: EnrichedListing[];
}

const initialState: UserState = {
  token: "",
  userProfile: {} as UserType,
  errorMessage: "",
  myRequests: [],
  myListings: [],
};

// const storeData = async (state: UserState) => {
//   try {
//     const response = await AsyncStorage.getItem("token");
//     if (response) {
//       state.token = response;
//     } else {
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

// storeData(initialState);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; userProfile: UserType }>
    ) => {
      const value = action.payload.token;
      AsyncStorage.setItem("token", value);
      state.token = action.payload.token;
      state.userProfile = action.payload.userProfile;
      //   console.log("this is in my redux store", state);
    },
    persistToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    clearToken: (state) => {
      state.token = ""
    },

    tokenStillValid: (state, action: PayloadAction<UserType>) => {
      // console.log("token payload", action.payload);
      state.userProfile = action.payload;
    },

    getRequestsFromMe: (state, action: PayloadAction<EnrichedRequest[]>) => {
      // console.log("payload for user from me", action.payload);
      state.myRequests = action.payload;
    },

    getListingsFromMe: (state, action: PayloadAction<EnrichedListing[]>) => {
      // console.log("payload for user from me", action.payload);
      state.myListings = action.payload;
    },

    errorMessage: (state, action: PayloadAction<string>) => {
      console.log("errorMessage", action.payload);
      state.errorMessage = action.payload;
    },

    logOut: (state, action: PayloadAction<undefined>) => {
      // console.log("logout");
      try {
        AsyncStorage.removeItem("token");
        state.token = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const {
  loginSuccess,
  persistToken,
  clearToken,
  tokenStillValid,
  errorMessage,
  logOut,
  getRequestsFromMe,
  getListingsFromMe,
} = userSlice.actions;

export default userSlice.reducer;
