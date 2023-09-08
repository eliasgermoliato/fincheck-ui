import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useHome } from "../HomeContext/useHome";
import { TransactionType } from "../../../../../interfaces/TransactionType";

export function Fab() {
  const { openNewAccountModalOpen, openNewTransactionModalOpen } = useHome();

  return (
    <div className="fixed right-4 bottom-4 ">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-900 text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mb-2 mr-4">
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() =>
              openNewTransactionModalOpen(TransactionType.EXPENSE)
            }
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModalOpen(TransactionType.INCOME)}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={openNewAccountModalOpen}
          >
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
