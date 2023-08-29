import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountsSliderNavigation() {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
