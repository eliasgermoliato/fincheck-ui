import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  className?: string;
  error?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({
  className,
  error,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "w-full h-[52px] px-3 pt-4 border rounded-lg relative outline-none text-left bg-white border-gray-500 text-gray-700 focus:border-gray-800 transition-all",
              error && "!border-red-900",
              className,
            )}
          >
            <span className="absolute top-2 left-[13px] text-xs pointer-events-none text-gray-700">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
