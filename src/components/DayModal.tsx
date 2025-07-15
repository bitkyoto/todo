import type { TaskInterface } from "@/types/Task";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  closeModal: () => void;
  tasks: TaskInterface[];
}
const STATUS_COLORS = {
  pending: "bg-[#f5d576]",
  completed: "bg-[#abbd9a]",
  expired: "bg-[#ac3834]",
  deleted: "bg-[#ff4040]",
} as const;
export const DayModal = ({ closeModal, tasks }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-gray-400/90">
      <div className="relative w-[90%] max-w-[500px] bg-white rounded-lg shadow-lg p-4 my-6 max-h-[60%]  overflow-y-auto">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <div className="cursor-pointer">
            <X size={20} />
          </div>
        </button>
        <div className="flex flex-col gap-y-4">
          <p className="text-center font-bold text-3xl">Задания на день</p>
        </div>

        <div className="flex flex-col gap-y-4 mt-4">
          {tasks.map((task) => (
            <div
              key={task.index}
              className={`${STATUS_COLORS[task.status] || STATUS_COLORS.pending}
              w-full rounded-xl p-2 flex flex-col gap-y-2`}
            >
              <div className="text-xl break-words">{task.title}</div>
              <div className="text-sm break-words">{task.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
