import { useContext } from "react";
import { HomeContext } from ".";

export function useHome() {
  return useContext(HomeContext);
}
