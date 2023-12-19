import { z } from "zod";
import { useHome } from "../../HomeContext/useHome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useBankAccountsQuery from "../../../../../../app/hooks/useFetches/useBankAccountsQuery";
import useCategoriesQuery from "../../../../../../app/hooks/useFetches/useCategoriesQuery";
import { useMemo } from "react";

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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);
  });

  const { data: accounts = [] } = useBankAccountsQuery();
  const { data: categoriesList = [] } = useCategoriesQuery();

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
    newTransactionType,
    control,
    errors,
    closeNewTransactionModalOpen,
    register,
    handleSubmit,
  };
}
