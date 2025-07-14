import { Check, Trash, ClockFading } from "lucide-react";
import { useState } from "react";
import type { TaskInterface, TodoType } from "../types/Task";
import { useDispatch } from "react-redux";
import { deleteTask, removeTask, updateStatus } from "../redux/TaskSlice";
import { TaskModal } from "./TaskModal";
import { X } from "lucide-react";
import moment from "moment";

const STATUS_COLORS = {
  pending: "bg-[#f5d576]",
  completed: "bg-[#abbd9a]",
  expired: "bg-[#ac3834]",
  deleted: "bg-[#ff4040]",
} as const;

interface ToDoProps extends TaskInterface {
  type: TodoType;
}

export const ToDo = ({
  title,
  content,
  index,
  status,
  dueDate,
  type,
}: ToDoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleStatusChange = (e: React.MouseEvent) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    dispatch(updateStatus({ index, status: newStatus }));
    e.stopPropagation();
  };

  const handleRemove = (e: React.MouseEvent) => {
    dispatch(removeTask({ index }));
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask({ index }));
  };

  return (
    <div
      className={`${
        STATUS_COLORS[status] || STATUS_COLORS.pending
      } p-2 shadow-md shadow-gray-500 w-full h-40 flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsTaskModalOpen(true)}
    >
      <div className="flex-1">
        <div className="text-xl break-words">{title}</div>
        <div className="text-sm break-words">{content}</div>
      </div>
      <div className="text-sm break-words text-end">
        {moment(dueDate).format("YYYY.MM.DD")}
      </div>
      {isHovered && type === "all" && (
        <div className="flex justify-center items-center gap-4 mt-2">
          <button className="cursor-pointer" onClick={handleStatusChange}>
            {status === "pending" ? <Check /> : <ClockFading />}
          </button>
          <button className="cursor-pointer" onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      )}
      {isHovered && type === "deleted" && (
        <div className="flex justify-center mt-2">
          <button className="cursor-pointer" onClick={handleDelete}>
            <X />
          </button>
        </div>
      )}
      {isTaskModalOpen && type === "all" && (
        <TaskModal
          title={title}
          content={content}
          index={index}
          status={status}
          closeModal={() => setIsTaskModalOpen(false)}
        />
      )}
    </div>
  );
};
