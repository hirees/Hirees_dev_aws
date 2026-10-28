import { io } from "socket.io-client";
import { API_ORIGIN } from "@/utils/constant";

export const socket = io(API_ORIGIN, {
  withCredentials: true,
  autoConnect: false,
});
