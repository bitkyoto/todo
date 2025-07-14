import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTask } from "./AddTask";
import { ToDo } from "./ToDo";
import type { RootState } from "../redux/store";
import { loadTasks } from "../redux/TaskSlice";
import type { TodoType } from "../types/Task";
import { Filler } from "./Filler";
interface ToDoCardProps {
  type: TodoType;
}
export const TodoCard = ({ type }: ToDoCardProps) => {
  const dispatch = useDispatch();
  const todos =
    type === "all"
      ? useSelector((state: RootState) => state.newTask.tasks)
      : useSelector((state: RootState) => state.newTask.historyTasks);
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <div className="mt-8 w-full mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
      {todos.map((todo) => (
        <ToDo
          key={todo.index}
          title={todo.title}
          content={todo.content}
          index={todo.index}
          status={todo.status}
          type={type}
          dueDate={todo.dueDate}
        />
      ))}
      {type === "all" && <AddTask />}
      {type === "deleted" && todos.length == 0 && <Filler />}
    </div>
  );
};
