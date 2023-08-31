import { useState } from "react";
import { useScreenSize } from "../../../../../app/hooks/useScreenSize";

export function useAccountsController() {
  const screenSize = useScreenSize();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    screenSize,
  };
}
