import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useBankAccountsQuery from "../../../../../../app/hooks/useFetches/useBankAccountsQuery";
import useCategoriesQuery from "../../../../../../app/hooks/useFetches/useCategoriesQuery";
import { useMemo } from "react";
import {
  Transaction,
  TransactionType,
} from "../../../../../../app/entities/Transaction";
import { useUpdateTransactionsMutation } from "../../../../../../app/hooks/useFetches/useTransactionsMutation";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor"), z.number()]),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe a categoria"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const queryClient = useQueryClient();

  const { data: accounts = [] } = useBankAccountsQuery();
  const { data: categoriesList = [] } = useCategoriesQuery();
  const { isLoading, mutateAsync: updateTransaction } =
    useUpdateTransactionsMutation();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(
        transaction!.type === TransactionType.EXPENSE
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!",
      );
      onClose();
    } catch (error) {
      toast.error(
        transaction!.type === TransactionType.EXPENSE
          ? "Desculpe, ocorreu um erro ao salvar a despesa. Tente novamente."
          : "Desculpe, ocorreu um erro ao salvar a receita. Tente novamente.",
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  function getDefaultValues(): z.infer<typeof schema> {
    return {
      bankAccountId: transaction?.bankAccountId ?? "",
      categoryId: transaction?.categoryId ?? "",
      name: transaction?.name ?? "",
      value: transaction?.value ?? "",
      date: transaction ? new Date(transaction.date) : new Date(),
    };
  }

  return {
    accounts,
    categories,
    isLoading,
    control,
    errors,
    register,
    handleSubmit,
  };
}
