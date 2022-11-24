import { RootState } from "..";

export const selectToken = (reduxState: RootState) => {
  return reduxState.user.token;
};

export const selectUser = (reduxState: RootState) => {
  return reduxState.user.userProfile;
};

export const selectErrorMessage = (reduxState: RootState) => {
  return reduxState.user.errorMessage;
};
