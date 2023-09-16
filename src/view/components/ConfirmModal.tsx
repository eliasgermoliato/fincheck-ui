import { ReactElement } from "react";
import { Modal } from "./Modal";
import { cn } from "../../app/utils/cn";
import { Button } from "./Button";

interface ConfirmModalProps {
  variant?: "danger";
  title: string;
  iconBg?: string;
  subTitle: string;
  description?: string;
  confirmText: string;
  cancelText: string;
  isLoading: boolean;
  Icon: () => ReactElement;
  onConfirm(): void;
  onClose(): void;
}

export function ConfirmModal({
  variant,
  title,
  iconBg,
  subTitle,
  description,
  confirmText,
  cancelText,
  isLoading,
  Icon,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal isOpen title={title} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div
          className={cn(
            "w-[52px] h-[52px] rounded-full flex items-center justify-center",
            iconBg,
          )}
        >
          <Icon />
        </div>

        <p className="w-[180px] tracking-customTight font-bold text-gray-800">
          {subTitle}
        </p>
        {description && (
          <p className="tracking-customTight text-gray-800">{description}</p>
        )}

        <div className="w-full mt-10 space-y-4">
          <Button
            className="w-full"
            variant={variant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>

          <Button
            className="w-full"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
