import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface State {
  socket: Socket | null;
  hasValidToken: Boolean;
}

const initialState:State = {
  socket: null,
  hasValidToken: false,
}


export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket>) => {
      return { ...state, socket: action.payload }
    },
    setHasValidToken: (state, action:PayloadAction<Boolean>) => {
      return { ...state, hasValidToken: action.payload }
    }
  },
});

export const { setSocket, setHasValidToken } =
  appStateSlice.actions;

export default appStateSlice.reducer;
