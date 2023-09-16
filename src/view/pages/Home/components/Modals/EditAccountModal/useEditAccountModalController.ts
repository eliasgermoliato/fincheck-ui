import { z } from "zod";
import { useHome } from "../../HomeContext/useHome";
import { BankAccountType } from "../../../../../../app/entities/BankAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useRemoveBankAccountsMutation,
  useUpdateBankAccountsMutation,
} from "../../../../../../app/hooks/useFetches/useBankAccountsMutation";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
  const { isLoading, mutateAsync: updateAccount } =
    useUpdateBankAccountsMutation();

  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useRemoveBankAccountsMutation();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateAccount({
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

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdit!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta excluída com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      toast.error(
        "Desculpe, ocorreu um erro ao exluir a conta. Tente novamente.",
      );
    }
  }

  return {
    isEditAccountModalOpen,
    control,
    isLoading,
    errors,
    isDeleteModalOpen,
    isLoadingDelete,
    closeEditAccountModal,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  };
}
