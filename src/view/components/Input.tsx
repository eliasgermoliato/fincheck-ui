import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          id={inputId}
          name={name}
          className={cn(
            "w-full h-[52px] px-3 pt-4 border rounded-lg outline-none bg-white border-gray-500 text-gray-800 placeholder-shown:pt-0 focus:border-gray-800 transition-all peer",
            error && "!border-red-900",
            className,
          )}
          placeholder=" "
        />

        <label
          htmlFor={inputId}
          className="absolute top-2 left-[13px] text-xs pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="mt-2 flex gap-2 items-center text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
