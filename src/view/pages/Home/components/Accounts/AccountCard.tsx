import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccount } from "../../../../../app/entities/BankAccount";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useHome } from "../HomeContext/useHome";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { currentBalance, name, type, color } = data;

  const { areValuesVisible, openEditAccountModal } = useHome();

  return (
    <div
      className="h-[200px] p-4 rounded-2xl flex flex-col justify-between border-b-4 bg-white border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="block mt-4 font-medium tracking-customTight text-gray-800">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "block font-medium tracking-customTight text-gray-800",
            !areValuesVisible && "blur-sm",
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
