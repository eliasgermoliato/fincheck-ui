import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { UserMenu } from "../components/UserMenu";

export function PrivatePageLayout() {
  return (
    <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>
      <main className="flex-1 max-h-[90%]">
        <Outlet />
      </main>
    </div>
  );
}
