import { TransactionType } from "../../../../../../interfaces/TransactionType";
import { Button } from "../../../../../components/Button";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModalOpen,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === TransactionType.EXPENSE;

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      isOpen={isNewTransactionModalOpen}
      onClose={closeNewTransactionModalOpen}
    >
      <form>
        <div>
          <span className="tracking-customTight text-xs text-gray-600">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="tracking-customTight text-lg text-gray-600">
              R$
            </span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
          />

          <Select
            placeholder="Categoria"
            options={[
              {
                value: "CHECKING",
                label: "Conta Corrente",
              },
              {
                value: "INVESTMENT",
                label: "Investimentos",
              },
              {
                value: "CASH",
                label: "Dinheiro Físico",
              },
            ]}
          />

          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
            options={[
              {
                value: "CHECKING",
                label: "Conta Corrente",
              },
              {
                value: "INVESTMENT",
                label: "Investimentos",
              },
              {
                value: "CASH",
                label: "Dinheiro Físico",
              },
            ]}
          />

          <DatePickerInput />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
