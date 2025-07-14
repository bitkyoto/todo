import { configureStore } from "@reduxjs/toolkit";
import { newTask } from "./TaskSlice";

export const store = configureStore({
  reducer: {
    newTask: newTask.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
