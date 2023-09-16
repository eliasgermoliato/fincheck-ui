import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  className,
  isLoading,
  variant,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled ?? isLoading}
      className={cn(
        "h-12 px-6 rounded-2xl flex  items-center justify-center font-medium text-white bg-teal-900 hover:bg-teal-800 active:bg-teal-950 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 transition-all",
        variant === "danger" && "bg-red-900 hover:bg-red-800 active:bg-red-900",
        variant === "ghost" &&
          "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5 active:bg-gray-800/10 disabled:border-none",
        className,
      )}
    >
      {isLoading && <Spinner className="w-6 h-6" />}
      {!isLoading && children}
    </button>
  );
}
