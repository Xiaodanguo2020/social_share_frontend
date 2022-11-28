import axios from "axios";
import { apiUrl } from "../../config/constance";
import { AnyAction } from "redux";
import { Listing, RequestInputType } from "../../typed";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "../index";
import { listingFetched, selectedListingFetched } from "./slice";

export const fetchListings =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.get<Listing[]>(`${apiUrl}/listings`);
      // console.log("my data", response.data);
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

export const createListingAndOrder =
  ({ start_date, end_date }: RequestInputType, id: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.post<RequestInputType>(
        `${apiUrl}/listings/${id}/request`,
        {
          start_date,
          end_date,
        },
        { headers: { Authorization: `Bearer ${getState().user.token}` } }
      );
      // console.log("this is in my redux store", getState());
      // console.log("this is response from the thunk", response.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
// console.log("this is my fetch", fetchOneListing(2));
