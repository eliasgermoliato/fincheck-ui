import { useMutation } from "@tanstack/react-query";
import { transactionsService } from "../../services/transactionsService";
import {
  CreateTransactionParams,
  UpdateTransactionParams,
} from "../../entities/Transaction";

export function useCreateTransactionsMutation() {
  const mutation = useMutation({
    mutationFn: async (body: CreateTransactionParams) => {
      return transactionsService.create(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}

export function useUpdateTransactionsMutation() {
  const mutation = useMutation({
    mutationFn: async (body: UpdateTransactionParams) => {
      return transactionsService.update(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}
