import axios from "axios";
import { apiUrl } from "../../config/constance";
import { AnyAction } from "redux";
import { CategoryType, Listing, RequestInputType, Status } from "../../typed";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "../index";
import {
  categoriesFetched,
  listingFetched,
  selectedListingFetched,
  listingAdded,
} from "./slice";
import { getTokenfromStore } from "../user/thunk";
import { getListingsFromMe, tokenStillValid } from "../user/slice";

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

export const createRequestAndOrder =
  (
    { start_date, end_date, title, description }: RequestInputType,
    id: number
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.post<RequestInputType>(
        `${apiUrl}/listings/${id}/request`,
        {
          title,
          description,
          start_date,
          end_date,
        },
        { headers: { Authorization: `Bearer ${getState().user.token}` } }
      );
      dispatch(getTokenfromStore());
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

export const getCategories =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.get<CategoryType[]>(`${apiUrl}/categories`);

      dispatch(categoriesFetched(response.data));
    } catch (e: any) {
      console.log(e.message);
    }
  };

type inputType = {
  title: string;
  description: string;
  imageURI: string;
  itemCategory: number;
};

export const createNewListing =
  ({ title, description, imageURI, itemCategory }: inputType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      console.log(
        "things from my thunk",
        title,
        description,
        imageURI,
        itemCategory
      );
      const response = await axios.post<Listing>(
        `${apiUrl}/listings`,
        {
          title: title,
          description: description,
          image: imageURI,
          categoryId: itemCategory,
        },
        { headers: { Authorization: `Bearer ${getState().user.token}` } }
      );
      // console.log("respons from created new lisitng", response.data);
      dispatch(listingAdded(response.data));
      dispatch(fetchListings());
    } catch (e: any) {
      console.log(e.message);
    }
  };

export const updateOrderStatus =
  (listingId: number, requestId: number, status: Status) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/listings/${listingId}/requests/${requestId}`,
        {
          status,
        },
        { headers: { Authorization: `Bearer ${getState().user.token}` } }
      );
      // console.log("did it come here");
      // console.log("listing", listingId);
      console.log("response from update order status", response);
      dispatch(getTokenfromStore());
    } catch (e) {
      console.log(e);
    }
  };
