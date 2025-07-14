import { Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "./Modal";
export const AddTask = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-center items-center p-2 w-full h-40 border-2 border-neutral-400">
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Plus />
        </button>
      </div>
      {isOpen && <Modal closeModal={() => setIsOpen(false)} />}
    </>
  );
};
