const { io } = require("socket.io-client");
const { wsUrl } = require("../config/constance");

export const socket = io(wsUrl);
