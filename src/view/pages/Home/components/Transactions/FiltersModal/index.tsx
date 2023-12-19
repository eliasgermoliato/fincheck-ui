import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModal } from "./useFiltersModalController";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  isOpen: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
}

export function FiltersModal({
  isOpen,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    selectedBankAccountId,
    selectedYear,
    accounts,
    handleSelectBankAccount,
    handleChangeYear,
  } = useFiltersModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-customTighter font-bold text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              className={cn(
                "w-full p-2 rounded-2xl text-left text-gray-800 transition-colors hover:bg-gray-50",
                account.id === selectedBankAccountId && "!bg-gray-200",
              )}
              onClick={() => handleSelectBankAccount(account.id)}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-customTighter font-bold">Ano</span>

        <div className="w-full mt-2 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-customTight">
              {selectedYear}
            </span>
          </div>

          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
