import { Accounts } from "./components/Accounts";
import { Fab } from "./components/Fab";
import { HomeContext, HomeProvider } from "./components/HomeContext";
import { EditAccountModal } from "./components/Modals/EditAccountModal";
import { NewAccountModal } from "./components/Modals/NewAccountModal";
import { NewTransactionModal } from "./components/Modals/NewTransactionModal";
import { Transactions } from "./components/Transactions";

export function Home() {
  return (
    <HomeProvider>
      <HomeContext.Consumer>
        {({ accountBeingEdit }) => (
          <>
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
            <NewTransactionModal />
            {accountBeingEdit && <EditAccountModal />}
          </>
        )}
      </HomeContext.Consumer>
    </HomeProvider>
  );
}
