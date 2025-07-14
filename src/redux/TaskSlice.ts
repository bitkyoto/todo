import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Status, type TaskInterface } from "../types/Task";
import {
  changeStatusToLs,
  loadTasksFromLs,
  saveTasksToLs,
  saveTaskToLs,
  updateTaskToLs,
} from "../utility/localstorage";

const initialState: { tasks: TaskInterface[]; historyTasks: TaskInterface[] } =
  {
    tasks: [],
    historyTasks: [],
  };

export const newTask = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskInterface>) => {
      state.tasks.push(action.payload);
      saveTaskToLs(action.payload);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ index: number; status: Status }>
    ) => {
      state.tasks[action.payload.index].status = action.payload.status;
      changeStatusToLs(action.payload.index, action.payload.status);
    },
    loadTasks: (state) => {
      const { tasks, historyTasks } = loadTasksFromLs();
      state.tasks = tasks;
      state.historyTasks = historyTasks;
    },
    removeTask: (state, action: PayloadAction<{ index: number }>) => {
      const deletedTask = state.tasks.find(
        (t) => t.index === action.payload.index
      );
      if (deletedTask) {
        deletedTask.status = "deleted";
        state.historyTasks.push(deletedTask);
      }
      state.tasks = state.tasks.filter(
        (task) => task.index !== action.payload.index
      );
      saveTasksToLs(state.tasks, state.historyTasks);
    },
    deleteTask: (state, action: PayloadAction<{ index: number }>) => {
      state.historyTasks = state.historyTasks.filter(
        (t) => t.index !== action.payload.index
      );
      saveTasksToLs(state.tasks, state.historyTasks);
    },
    updateTask(
      state,
      action: PayloadAction<{
        task: TaskInterface;
      }>
    ) {
      state.tasks[
        state.tasks.findIndex((t) => t.index === action.payload.task.index)
      ] = action.payload.task;
      updateTaskToLs(action.payload.task);
    },
  },
});

export const {
  addTask,
  updateStatus,
  loadTasks,
  removeTask,
  updateTask,
  deleteTask,
} = newTask.actions;
