import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/TaskSlice";
import type { RootState } from "../redux/store";
import { saveTaskToLs } from "../utility/localstorage";
import { DatePickerInput } from "./DatePickerInput";

interface ModalProps {
  closeModal: () => void;
}

export const Modal = ({ closeModal }: ModalProps) => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const dispatch = useDispatch();
  const index = useSelector((state: RootState) => state.newTask.tasks.length);

  return (
    <div className="fixed inset-0 z-50 flex  justify-center bg-gray-400/90">
      <div className="relative w-[90%] h-max max-w-[500px] bg-white rounded-lg shadow-lg p-4 my-6 overflow-auto">
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
          <p className="text-center font-bold text-3xl">Новая задача</p>

          <div>
            <p>Название</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-600 h-10 rounded-md px-2 mt-3"
            />
          </div>
          <div>
            <p>Содержание задачи</p>
            <textarea
              className="w-full border border-gray-600 rounded-md p-2 min-h-[100px] mt-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <DatePickerInput date={date} setDate={setDate} />
          </div>

          <button
            className="bg-[#adbbaa] py-2 px-4 rounded-xl self-center cursor-pointer"
            onClick={() => {
              if (title && content) {
                dispatch(
                  addTask({
                    title,
                    content,
                    index,
                    status: "pending",
                    dueDate: date ? date : undefined,
                  })
                );
              }
              closeModal();
            }}
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};
