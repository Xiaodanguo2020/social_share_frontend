import axios from "axios";
import { apiUrl } from "../../config/constance";
import { AnyAction } from "redux";
import { Listing } from "../../typed";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "../index";
import {
  errorMessage,
  loginSuccess,
  persistToken,
  tokenStillValid,
  getRequestsFromMe,
} from "./slice";
import { selectToken } from "./selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormValues } from "../../typed";

export const login = ({ email, password }: FormValues) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      dispatch(
        loginSuccess({
          token: response.data.token,
          userProfile: response.data.user,
        })
      );
      //   console.log("this is the response from the  backend", response.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(errorMessage(error.response.data.message));
      } else {
        console.log(error.message);
      }
    }
  };
};

export const getTokenfromStore =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const responseStoreToken = await AsyncStorage.getItem("token");
      if (responseStoreToken) {
        dispatch(persistToken(responseStoreToken));
        // console.log("this is the token from asynstore", responseStoreToken);
        const response = await axios.get(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${responseStoreToken}` },
        });

        // console.log("this is the data from token", response.data);
        dispatch(tokenStillValid(response.data));
        dispatch(getRequestsFromMe(response.data.myRequests));
        // console.log("this is my request data", response.data.myRequests);
        // console.log("this is my listing data", response.data.myListings);
      } else {
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

// export const getUserWithStoredToken =
//   () => async (dispatch: AppDispatch, getState: () => RootState) => {
//     const token = selectToken(getState());

//     if (token === null) {
//       console.log("no token");
//       return;
//     }

//     try {
//       const response = await axios.get(`${apiUrl}/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("from getUser with toke data", response.data);
//     } catch (error: any) {
//       if (error.response) {
//         console.log(error.response.message);
//       } else {
//         console.log(error);
//       }
//     }
//   };
