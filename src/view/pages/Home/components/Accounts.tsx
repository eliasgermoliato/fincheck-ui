import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { BankAccountType } from "../../../../interfaces/BankAccount";

export function Accounts() {
  return (
    <div className="w-full h-full rounded-2xl px-4 py-8 flex flex-col bg-teal-900 md:p-10">
      <div>
        <span className="block tracking-customTight text-white">
          Saldo total
        </span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-customTighter text-white">
            R$ 1000,00
          </strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <strong className="text-lg tracking-customTighter text-white">
            Minhas contas
          </strong>

          <div>
            <button className="py-3 pl-2.5 pr-3.5 rounded-full transition-colors enabled:hover:bg-black/10 disabled:opacity-40">
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button className="py-3 pl-2.5 pr-3.5 rounded-full transition-colors enabled:hover:bg-black/10 disabled:opacity-40">
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <AccountCard
            color="#7950F2"
            name="Nubank"
            balance={1000.23}
            type={BankAccountType.CHECKING}
          />
          <AccountCard
            color="#333"
            name="XP"
            balance={1000.23}
            type={BankAccountType.INVESTMENT}
          />
          <AccountCard
            color="#0F0"
            name="Carteira"
            balance={1000.23}
            type={BankAccountType.CASH}
          />
        </div>
      </div>
    </div>
  );
}
