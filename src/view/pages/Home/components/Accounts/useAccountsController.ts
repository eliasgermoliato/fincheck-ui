import { useState } from "react";
import { useScreenSize } from "../../../../../app/hooks/useScreenSize";
import { useHome } from "../HomeContext/useHome";

export function useAccountsController() {
  const { areValuesVisible, toggleValueVisibility } = useHome();
  const screenSize = useScreenSize();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    areValuesVisible,
    toggleValueVisibility,
    screenSize,
    sliderState,
    setSliderState,
  };
}
