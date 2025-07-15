import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/TaskSlice";
import type { Status, TaskInterface } from "../types/Task";
interface TaskModalProps {
  closeModal: () => void;
  title: string;
  content: string;
  index: number;
  status: Status;
}

export const TaskModal = ({
  closeModal,
  title,
  content,
  index,
  status,
}: TaskModalProps) => {
  const [changedTitle, setChanedTitle] = useState<string>(title);
  const [changedContent, setChangedContent] = useState<string>(content);
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center bg-gray-400/90">
      <div className="relative w-[90%] max-w-[500px] bg-white rounded-lg shadow-lg p-4 my-6 overflow-auto">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          aria-label="Close modal"
        >
          <div className="cursor-pointer">
            <X size={20} />
          </div>
        </button>
        <div className="flex flex-col gap-y-4">
          <p className="text-center font-bold text-3xl">Редактировать задачу</p>
          <div>
            <p>Название</p>
            <input
              type="text"
              value={changedTitle}
              onChange={(e) => {
                setChanedTitle(e.target.value);
              }}
              className="w-full border border-gray-600 h-10 rounded-md px-2"
            />
          </div>
          <div>
            <p>Содержание задачи</p>
            <textarea
              className="w-full border border-gray-600 rounded-md p-2 min-h-[100px]"
              value={changedContent}
              onChange={(e) => {
                setChangedContent(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-[#adbbaa] py-2 px-4 rounded-xl self-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const task: TaskInterface = {
                title: changedTitle,
                content: changedContent,
                index,
                status,
              };
              dispatch(updateTask({ task }));
              closeModal();
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
