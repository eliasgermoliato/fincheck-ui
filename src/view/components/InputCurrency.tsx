import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      className="text-[32px] font-bold tracking-customTighter outline-none text-gray-900"
      thousandSeparator="."
      decimalSeparator=","
    />
  );
}
