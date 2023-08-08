import { configureStore } from "@reduxjs/toolkit";
import { wsApi } from "./api";
import { playerSlice } from "./slices/player";
import { roomSlice } from "./slices/room";

export const store = configureStore({
  reducer: {
    [wsApi.reducerPath]: wsApi.reducer,
    playerReducer: playerSlice.reducer,
    roomReducer: roomSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsApi.middleware),
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
