import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  value?: string | number;
  error?: string;
  onChange?(value: string): void;
}

export function InputCurrency({ value, error, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className={cn(
          "w-full text-[32px] font-bold tracking-customTighter outline-none text-gray-900",
          error && "text-red-900",
        )}
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />

      {error && (
        <div className="mt-2 flex gap-2 items-center text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
