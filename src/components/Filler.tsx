import React from "react";

export const Filler = () => {
  return (
    <div className="flex flex-col justify-center items-center p-2 w-full h-40 border-2 border-neutral-400">
      <div>
        <div className="text-xl break-words">У вас нет удаленных задач!</div>
        <div className="text-sm break-words">Я думаю, что это хорошо :)</div>
      </div>
    </div>
  );
};
