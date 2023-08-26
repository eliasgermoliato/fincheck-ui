import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="h-12 px-6 rounded-2xl font-medium text-white bg-teal-900 hover:bg-teal-800 active:bg-teal-950 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 transition-all"
    />
  );
}
