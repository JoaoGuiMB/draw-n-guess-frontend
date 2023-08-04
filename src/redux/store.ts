import { configureStore } from "@reduxjs/toolkit";
import { wsApi } from "./api";
import { playerSlice } from "./slices/player";

export const store = configureStore({
  reducer: {
    playerReducer: playerSlice.reducer,
    [wsApi.reducerPath]: wsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsApi.middleware),
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
