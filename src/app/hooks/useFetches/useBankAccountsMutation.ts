import { useMutation } from "@tanstack/react-query";
import { bankAccountsService } from "../../services/bankAccountsService";
import {
  CreateBankAccountParams,
  UpdateBankAccountParams,
} from "../../entities/BankAccount";

export function useCreateBankAccountsMutation() {
  const mutation = useMutation({
    mutationFn: async (body: CreateBankAccountParams) => {
      return bankAccountsService.create(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}

export function useUpdateBankAccountsMutation() {
  const mutation = useMutation({
    mutationFn: async (body: UpdateBankAccountParams) => {
      return bankAccountsService.update(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}

export function useRemoveBankAccountsMutation() {
  const mutation = useMutation({
    mutationFn: async (bankAccountId: string) => {
      return bankAccountsService.remove(bankAccountId);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}
