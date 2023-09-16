import { z } from "zod";
import { useHome } from "../../HomeContext/useHome";
import { BankAccountType } from "../../../../../../app/entities/BankAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBankAccountsMutation } from "../../../../../../app/hooks/useFetches/useBankAccountsMutation";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  initialBalance: z.union([
    z
      .string({ required_error: "Campo obrigatório" })
      .nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),

  name: z
    .string({ required_error: "Campo obrigatório" })
    .nonempty("Nome da conta é obrigatório"),

  type: z.nativeEnum(BankAccountType, { required_error: "Campo obrigatório" }),

  color: z
    .string({ required_error: "Campo obrigatório" })
    .nonempty("Cor é obrigatória"),
});

interface FormData extends z.infer<typeof schema> {}

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, accountBeingEdit, closeEditAccountModal } =
    useHome();

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
  const { mutateAsync, isLoading } = useUpdateBankAccountsMutation();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdit!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta editada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error(
        "Desculpe, ocorreu um erro ao editar a conta. Tente novamente.",
      );
    }
  });

  function getDefaultValues(): Partial<z.infer<typeof schema>> {
    return {
      name: accountBeingEdit?.name,
      initialBalance: accountBeingEdit?.initialBalance,
      type: accountBeingEdit?.type,
      color: accountBeingEdit?.color,
    };
  }

  return {
    isEditAccountModalOpen,
    control,
    isLoading,
    errors,
    closeEditAccountModal,
    register,
    handleSubmit,
  };
}
