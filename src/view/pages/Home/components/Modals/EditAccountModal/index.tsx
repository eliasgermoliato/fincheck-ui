import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { ColorsDropdownInput } from "../../../../../components/ColorsDropdownInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";
import { ConfirmModal } from "../../../../../components/ConfirmModal";

export function EditAccountModal() {
  const {
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
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmModal
        variant="danger"
        title="Excluir"
        subTitle="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        confirmText="Sim, desejo excluir"
        cancelText="Cancelar"
        iconBg="bg-red-0"
        Icon={() => <TrashIcon className="w-6 h-6 text-red-900" />}
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      isOpen={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="tracking-customTight text-xs text-gray-600">
            Saldo inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="tracking-customTight text-lg text-gray-600">
              R$
            </span>

            <Controller
              control={control}
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                value={value}
                onChange={onChange}
                error={errors.type?.message}
                options={[
                  {
                    value: "CHECKING",
                    label: "Conta Corrente",
                  },
                  {
                    value: "INVESTMENT",
                    label: "Investimentos",
                  },
                  {
                    value: "CASH",
                    label: "Dinheiro Físico",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                value={value}
                onChange={onChange}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
