import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      className={cn(
        "w-full h-12 rounded-full text-sm tracking-customTight font-medium text-gray-800",
        isActive && "bg-white",
      )}
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  );
}
