import { z } from "zod";
import { useHome } from "../../HomeContext/useHome";
import { BankAccountType } from "../../../../../../app/entities/BankAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useBankAccountsMutation from "../../../../../../app/hooks/useFetches/useBankAccountsMutation";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  initialBalance: z
    .string({ required_error: "Campo obrigatório" })
    .nonempty("Saldo inicial é obrigatório"),

  name: z
    .string({ required_error: "Campo obrigatório" })
    .nonempty("Nome da conta é obrigatório"),

  type: z.nativeEnum(BankAccountType, { required_error: "Campo obrigatório" }),

  color: z
    .string({ required_error: "Campo obrigatório" })
    .nonempty("Cor é obrigatória"),
});

interface FormData extends z.infer<typeof schema> {}

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModalOpen } = useHome();

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
  const { mutateAsync, isLoading } = useBankAccountsMutation();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta cadastrada com sucesso!");
      closeNewAccountModalOpen();
      reset(getDefaultValues());
    } catch (error) {
      toast.error(
        "Desculpe, ocorreu um erro ao cadastrar a conta. Tente novamente.",
      );
    }
  });

  function getDefaultValues(): z.infer<typeof schema> {
    return {
      name: "",
      initialBalance: "0",
      type: BankAccountType.CHECKING,
      color: "",
    };
  }

  return {
    isNewAccountModalOpen,
    control,
    isLoading,
    errors,
    closeNewAccountModalOpen,
    register,
    handleSubmit,
  };
}
