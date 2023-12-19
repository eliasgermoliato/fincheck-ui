import { z } from "zod";
import { useHome } from "../../HomeContext/useHome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useBankAccountsQuery from "../../../../../../app/hooks/useFetches/useBankAccountsQuery";
import useCategoriesQuery from "../../../../../../app/hooks/useFetches/useCategoriesQuery";
import { useMemo } from "react";
import { useCreateTransactionsMutation } from "../../../../../../app/hooks/useFetches/useTransactionsMutation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TransactionType } from "../../../../../../app/entities/Transaction";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.string().nonempty("Informe o valor"),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccountId: z.string().nonempty("Informe a categoria"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModalOpen,
  } = useHome();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const queryClient = useQueryClient();

  const { data: accounts = [] } = useBankAccountsQuery();
  const { data: categoriesList = [] } = useCategoriesQuery();
  const { isLoading, mutateAsync } = useCreateTransactionsMutation();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        newTransactionType === TransactionType.EXPENSE
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!",
      );
      closeNewTransactionModalOpen();
      reset();
    } catch (error) {
      toast.error(
        newTransactionType === TransactionType.EXPENSE
          ? "Desculpe, ocorreu um erro ao cadastrar a despesa. Tente novamente."
          : "Desculpe, ocorreu um erro ao cadastrar a receita. Tente novamente.",
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  function getDefaultValues(): z.infer<typeof schema> {
    return {
      name: "",
      bankAccountId: "",
      categoryId: "",
      value: "",
      date: new Date(),
    };
  }

  return {
    accounts,
    categories,
    isNewTransactionModalOpen,
    isLoading,
    newTransactionType,
    control,
    errors,
    closeNewTransactionModalOpen,
    register,
    handleSubmit,
  };
}
