import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { youngApi } from "./api";

export const store = configureStore({
  reducer: {
    [youngApi.reducerPath]: youngApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(youngApi.middleware)
});

setupListeners(store.dispatch);
