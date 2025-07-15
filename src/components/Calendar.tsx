import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayModal } from "./DayModal";
import type { TaskInterface } from "@/types/Task";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const findTasks = (
  month: number,
  day: number,
  year: number
): TaskInterface[] => {
  const tasksStr = localStorage.getItem("tasks");
  const tasks: TaskInterface[] = tasksStr ? JSON.parse(tasksStr) : [];
  return tasks.filter((task) => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getMonth() === month &&
      taskDate.getDate() === day &&
      taskDate.getFullYear() === year
    );
  });
};

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);
  const [selectedDayTasks, setSelectedDayTasks] = useState<TaskInterface[]>([]);

  const firstDayOfMonth =
    new Date(year, month, 1).getDay() === 0
      ? 6
      : new Date(year, month, 1).getDay() - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const renderDays = () => {
    const days = [];

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-prev-${i}`}
          className="w-full h-24 bg-[#8d9b74] rounded-md p-2 opacity-50 box-border"
        />
      );
    }

    // Ячейки с днями текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const tasks = findTasks(month, day, year);
      const taskCount = tasks.length;

      days.push(
        <div
          key={day}
          className="w-full h-24 bg-[#8d9b74] rounded-md p-2 hover:bg-[#6b7659] transition-colors cursor-pointer box-border"
          onClick={() => {
            setIsDayModalOpen(true);
            setSelectedDayTasks(tasks);
          }}
        >
          <div className="font-medium">{day}</div>
          {taskCount > 0 && (
            <div className="text-sm mt-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              {taskCount}
            </div>
          )}
        </div>
      );
    }

    // Пустые ячейки для дней следующего месяца, чтобы заполнить сетку
    const totalCells = days.length;
    const emptyCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < emptyCells; i++) {
      days.push(
        <div
          key={`empty-next-${i}`}
          className="w-full h-24 bg-[#8d9b74] rounded-md p-2 opacity-50"
        />
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="w-full mx-8 mt-8">
      <div className="flex justify-center items-center gap-x-20 mb-6">
        <button onClick={prevMonth} className="p-2 rounded-full cursor-pointer">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold w-44 text-center">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full cursor-pointer">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">{renderDays()}</div>
      {isDayModalOpen && (
        <DayModal
          closeModal={() => setIsDayModalOpen(false)}
          tasks={selectedDayTasks}
        />
      )}
    </div>
  );
};
