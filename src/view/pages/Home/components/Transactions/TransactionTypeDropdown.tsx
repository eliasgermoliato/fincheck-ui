import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { TransactionType } from "../../../../../app/entities/Transaction";

interface TransactionTypeDropdownProps {
  selectedType: TransactionType | undefined;
  onSelect(type: TransactionType | undefined): void;
}

export function TransactionTypeDropdown({
  selectedType,
  onSelect,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === TransactionType.EXPENSE && <ExpensesIcon />}
          {selectedType === TransactionType.INCOME && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm tracking-customTight font-medium text-gray-800">
            {selectedType === TransactionType.EXPENSE && "Despesas"}
            {selectedType === TransactionType.INCOME && "Receitas"}
            {selectedType === undefined && "Transações"}
          </span>

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(TransactionType.INCOME)}
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(TransactionType.EXPENSE)}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
