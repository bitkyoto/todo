import { Calendar, Menu, History, House } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div
      className={`pt-8 bg-[#54704d] flex flex-col items-start text-white transition-all duration-200 ease-in-out  ${
        isOpen ? "w-48 px-4" : "w-16 px-2"
      }`}
    >
      <Menu
        size={24}
        className={`cursor-pointer ${isOpen ? "" : "self-center"}`}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div className="flex flex-col mt-8 gap-y-6 w-full">
        <div
          className={`flex gap-x-3 items-center min-h-[24px] cursor-pointer ${
            isOpen ? "" : "self-center"
          }`}
          onClick={() => handleClick("")}
        >
          <House size={20} className="flex-shrink-0" />
          {isOpen && <span>Домашняя</span>}
        </div>
        <div
          className={`flex gap-x-3 items-center min-h-[24px] cursor-pointer ${
            isOpen ? "" : "self-center"
          }`}
          onClick={() => handleClick("calendar")}
        >
          <Calendar size={20} className="flex-shrink-0" />
          {isOpen && <span>Календарь</span>}
        </div>
        <div
          className={`flex gap-x-3 items-center min-h-[24px] cursor-pointer ${
            isOpen ? "" : "self-center"
          }`}
          onClick={() => handleClick("history")}
        >
          <History size={20} className="flex-shrink-0" />
          {isOpen && <span>История</span>}
        </div>
      </div>
    </div>
  );
};
