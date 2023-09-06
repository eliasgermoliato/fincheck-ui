import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      className="w-full text-[32px] font-bold tracking-customTighter outline-none text-gray-900"
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0"
    />
  );
}
