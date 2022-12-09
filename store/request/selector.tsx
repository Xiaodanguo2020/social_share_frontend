import { RootState } from "..";
import { Request } from "../../typed";

export const selectRequests = (reduxState: RootState) => {
  return reduxState.request.request;
};
