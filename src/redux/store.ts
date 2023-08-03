import { configureStore } from "@reduxjs/toolkit";
import { wsApi } from "./api";

export const store = configureStore({
  reducer: {
    [wsApi.reducerPath]: wsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsApi.middleware),
});
