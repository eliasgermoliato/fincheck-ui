import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signout, user } = useAuth();

  function getInitials(fullName: string) {
    const splittedFullName = fullName.split(" ");

    const firstInitial = splittedFullName[0].charAt(0).toUpperCase();

    const lastSurname = splittedFullName[splittedFullName.length - 1];
    const lastInitial = lastSurname.charAt(0).toUpperCase();

    const initials = `${firstInitial}${lastInitial}`;

    return initials;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-teal-0 border-teal-200">
          <span className="text-sm tracking-customTight font-medium text-teal-900">
            {getInitials(user?.name ?? "")}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signout}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
