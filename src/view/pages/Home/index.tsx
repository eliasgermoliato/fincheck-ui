import { Accounts } from "./components/Accounts";
import { Fab } from "./components/Fab";
import { HomeProvider } from "./components/HomeContext";
import { NewAccountModal } from "./components/Modals/NewAccountModal";
import { Transactions } from "./components/Transactions";

export function Home() {
  return (
    <HomeProvider>
      <div className="w-full h-full flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <Accounts />
        </div>

        <div className="w-full md:w-1/2">
          <Transactions />
        </div>
      </div>
      <Fab />
      <NewAccountModal />
    </HomeProvider>
  );
}
