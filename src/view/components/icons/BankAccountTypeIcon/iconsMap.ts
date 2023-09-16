import { BankAccountType } from "../../../../app/entities/BankAccount";
import { CashIcon } from "./CashIcon";
import { CheckingIcon } from "./CheckingIcon";
import { InvestmentIcon } from "./InvestmentIcon";

export const iconsMap: Record<BankAccountType, React.ElementType> = {
  CHECKING: CheckingIcon,
  INVESTMENT: InvestmentIcon,
  CASH: CashIcon,
};
