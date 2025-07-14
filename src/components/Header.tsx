import { Trash } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
export const Header = () => {
  return (
    <>
      <div>
        <ul className="flex gap-x-4 items-center my-4 text-2xl">
          <li className="flex items-center hover:underline cursor-pointer">
            <Calendar /> Календарь
          </li>
          <li className="flex items-center hover:underline cursor-pointer">
            <Trash /> Корзина
          </li>
          <li className="hover:underline cursor-pointer ml-auto">ToDoApp </li>
        </ul>
      </div>
    </>
  );
};
