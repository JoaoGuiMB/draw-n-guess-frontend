import { io } from "socket.io-client";

const SERVER_URL = "ws://localhost:1337/";

export const socket = io(SERVER_URL, { transports: ["websocket"] });
