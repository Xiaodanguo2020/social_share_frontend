const host = "172.20.10.4";

export const apiUrl = process.env.API_URL || `http://${host}:4000`;
export const wsUrl = process.env.API_URL || `ws://${host}:4000`;
// "http://172.29.10.176:4000"
// 192.168.1.81
