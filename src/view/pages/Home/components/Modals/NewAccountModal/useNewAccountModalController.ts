import { useHome } from "../../HomeContext/useHome";

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModalOpen } = useHome();

  return {
    isNewAccountModalOpen,
    closeNewAccountModalOpen,
  };
}
