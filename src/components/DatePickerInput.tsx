import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerInputProps {
  date: Date | undefined;
  setDate: any;
}

export function DatePickerInput({ date, setDate }: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      Дедлайн
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal border-gray-600"
          >
            {date ? date.toLocaleDateString() : "Выберите дату"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
          side="bottom"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            endMonth={new Date(2040, 0)}
            startMonth={new Date(2025, 6)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
