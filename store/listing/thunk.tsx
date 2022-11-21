import axios from "axios";
import { apiUrl } from "../../config/constance";
import { AnyAction } from "redux";
import { Listing } from "../../types";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "../index";
import { listingFetched } from "./slice";

export const fetchListings =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.get<Listing[]>(`${apiUrl}/listings`);
      console.log("my data", response.data);
      dispatch(listingFetched(response.data));
    } catch (e: any) {
      console.log(e.message);
    }
  };
