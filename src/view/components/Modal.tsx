import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../app/utils/cn";
import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  rightAction?: React.ReactNode;
}

export function Modal({
  className,
  children,
  isOpen,
  title,
  rightAction,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
            "data-[state=open]:animate-overlay-show",
          )}
        />
        <Dialog.Content
          className={cn(
            "max-w-[400px] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 rounded-2xl z-[51] shadow-default bg-white outline-none",
            "data-[state=open]:animate-content-show",
            className,
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button className="w-12 h-12">
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span className="text-lg tracking-customTighter font-bold">
              {title}
            </span>

            <div className="w-12 h-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
