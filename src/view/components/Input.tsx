import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        className="w-full h-[52px] px-3 pt-4 border rounded-lg outline-none bg-white border-gray-500 text-gray-800 placeholder-shown:pt-0 focus:border-gray-800 transition-all peer"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute top-2 left-[13px] text-xs pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}
