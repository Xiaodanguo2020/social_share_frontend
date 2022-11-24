import axios from "axios";
import { apiUrl } from "../../config/constance";
import { AnyAction } from "redux";
import { Listing } from "../../typed";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "../index";
import { listingFetched, selectedListingFetched } from "./slice";

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

// export const fetchOneListing = async (id: number) => {
//   console.log(id, "this is the id of the thunk");
//   try {
//     console.log(" I went in ");
//     const response = await axios.get<Listing>(`${apiUrl}/listings/${id}`);
//     console.log("my one listing data", response.data);
//   } catch (e: any) {
//     console.log(e.message);
//   }
// };

export const fetchOneListing =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.get<Listing>(`${apiUrl}/listings/${id}`);
      //   console.log("my one listing data", response.data);
      dispatch(selectedListingFetched(response.data));
    } catch (e: any) {
      console.log(e.message);
    }
  };

// console.log("this is my fetch", fetchOneListing(2));
