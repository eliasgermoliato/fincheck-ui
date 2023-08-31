import { Accounts } from "./components/Accounts";
import { HomeProvider } from "./components/HomeContext";
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
    </HomeProvider>
  );
}
