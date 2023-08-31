import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountType } from "../../../../../interfaces/BankAccount";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useHome } from "../HomeContext/useHome";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: BankAccountType;
}

export function AccountCard({ color, name, balance, type }: AccountCardProps) {
  const { areValuesVisible } = useHome();
  return (
    <div
      className="h-[200px] p-4 rounded-2xl flex flex-col justify-between border-b-4 bg-white border-teal-950"
      style={{ borderColor: color }}
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
          {formatCurrency(balance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
