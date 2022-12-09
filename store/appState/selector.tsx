import { RootState } from "..";

export const selectSocket = (reduxState: RootState) => {
  return reduxState.appState.socket
}

export const selectHasValidToken = (reduxState: RootState) => {
  return reduxState.appState.hasValidToken
}
