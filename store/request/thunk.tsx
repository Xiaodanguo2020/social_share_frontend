import React from "react";
import { RootState, AppDispatch } from "../index";
import axios from "axios";
import { CategoryType, Listing, RequestInputType, Status } from "../../typed";
import { apiUrl } from "../../config/constance";
import { requestsFetched } from "./slice";

export const fetchRequests =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await axios.get(`${apiUrl}/requests`);
      console.log("my request data", response.data);
      dispatch(requestsFetched(response.data));
    } catch (e: any) {
      console.log(e.message);
    }
  };
