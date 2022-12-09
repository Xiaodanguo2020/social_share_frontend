const host = "192.168.1.51"
// "192.168.1.51"
export const apiUrl = process.env.API_URL || `http://${host}:4000`;
export const wsUrl = process.env.WS_URL || `ws://${host}:4000`
