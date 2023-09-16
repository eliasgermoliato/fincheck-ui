import { useMutation } from "@tanstack/react-query";
import { bankAccountsService } from "../../services/bankAccountsService";
import { BankAccountParamsFormatted } from "../../entities/BankAccount";

export default function useBankAccountsMutation() {
  const mutation = useMutation({
    mutationFn: async (body: BankAccountParamsFormatted) => {
      return bankAccountsService.create(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}
