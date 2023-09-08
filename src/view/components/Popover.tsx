import * as RdxPopover from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn";

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverMenuRoot({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverMenuTrigger({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}

function PopoverContent({ children, className }: PopoverProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          "p-4 rounded-2xl bg-white space-y-2 z-[99] shadow-default",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className,
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverMenuRoot,
  Trigger: PopoverMenuTrigger,
  Content: PopoverContent,
};
