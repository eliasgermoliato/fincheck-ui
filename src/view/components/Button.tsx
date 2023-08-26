import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "h-12 px-6 rounded-2xl font-medium text-white bg-teal-900 hover:bg-teal-800 active:bg-teal-950 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 transition-all",
        className,
      )}
    />
  );
}
