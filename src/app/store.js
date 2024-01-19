import { configureStore } from "@reduxjs/toolkit";
import { playerApi } from "./api";
import playerSlice from "../feature/playerSlice";

export const store = configureStore({
  reducer: {
    [playerApi.reducerPath]: playerApi.reducer,
    playerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playerApi.middleware),
});
