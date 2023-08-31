import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const screensConfig = resolveConfig(tailwindConfig).theme.screens;

type ScreenSizeProps = Record<keyof typeof screensConfig, boolean>;

export function useScreenSize(): ScreenSizeProps {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return getScreenSize(windowWidth);
}

function getScreenSize(windowWidth: number): ScreenSizeProps {
  const screenSize: ScreenSizeProps = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  };

  switch (true) {
    case windowWidth >= parsePixelValue(screensConfig["2xl"]):
      screenSize["2xl"] = true;
      break;
    case windowWidth >= parsePixelValue(screensConfig.xl):
      screenSize.xl = true;
      break;
    case windowWidth >= parsePixelValue(screensConfig.lg):
      screenSize.lg = true;
      break;
    case windowWidth >= parsePixelValue(screensConfig.md):
      screenSize.md = true;
      break;
    case windowWidth >= parsePixelValue(screensConfig.sm):
      screenSize.sm = true;
      break;
    default:
      screenSize.xs = true;
      break;
  }

  return screenSize;
}

function parsePixelValue(valueWithPx: string) {
  if (!valueWithPx.endsWith("px")) {
    throw new Error('A entrada deve terminar com "px".');
  }

  const numericValue = parseInt(valueWithPx);

  if (isNaN(numericValue)) {
    throw new Error("Não foi possível converter o valor em um número.");
  }

  return numericValue;
}
