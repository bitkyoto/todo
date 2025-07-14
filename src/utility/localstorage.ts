import type { Status, TaskInterface } from "../types/Task";

export function saveTasksToLs(
  tasks: TaskInterface[],
  historyTasks: TaskInterface[]
): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("historyTasks", JSON.stringify(historyTasks));
}

export function saveTaskToLs(task: TaskInterface): void {
  const tasksStr = localStorage.getItem("tasks");
  let tasks: TaskInterface[] = tasksStr ? JSON.parse(tasksStr) : [];

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasksFromLs() {
  const tasksStr = localStorage.getItem("tasks");
  const historyStr = localStorage.getItem("historyTasks");
  return {
    tasks: tasksStr ? JSON.parse(tasksStr) : [],
    historyTasks: historyStr ? JSON.parse(historyStr) : [],
  };
}

export function changeStatusToLs(index: number, status: Status) {
  const tasksStr = localStorage.getItem("tasks");
  const tasks: TaskInterface[] = tasksStr ? JSON.parse(tasksStr) : [];
  tasks[tasks.findIndex((t) => t.index === index)].status = status;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function updateTaskToLs(task: TaskInterface) {
  const tasksStr = localStorage.getItem("tasks");
  const tasks: TaskInterface[] = tasksStr ? JSON.parse(tasksStr) : [];
  tasks[tasks.findIndex((t) => t.index === task.index)] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
