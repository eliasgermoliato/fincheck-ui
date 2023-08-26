import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled ?? isLoading}
      className={cn(
        "h-12 px-6 rounded-2xl flex items-center justify-center font-medium text-white bg-teal-900 hover:bg-teal-800 active:bg-teal-950 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 transition-all",
        className,
      )}
    >
      {isLoading && <Spinner className="w-6 h-6" />}
      {!isLoading && children}
    </button>
  );
}
