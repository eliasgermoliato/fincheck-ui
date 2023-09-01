import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/empty-state.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";

export function Transactions() {
  const { areValuesVisible, isInitialLoading, isLoading, transactions } =
    useTransactionsController();

  const hasTransactions = !!transactions.length;

  return (
    <div className="w-full h-full rounded-2xl px-4 py-8 flex flex-col bg-gray-100 md:p-10">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} centeredSlides>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center">
                <img
                  src={emptyStateImage}
                  alt="Ilustração de uma mulher com uma lupa"
                />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="p-4 rounded-2xl flex items-center justify-between gap-4 bg-white">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="font-bold tracking-customTight block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/04/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-medium text-red-800 tracking-customTight",
                      !areValuesVisible && "blur-sm",
                    )}
                  >
                    - {formatCurrency(123)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl flex items-center justify-between gap-4 bg-white">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-customTight block">
                        Salário
                      </strong>
                      <span className="text-sm text-gray-600">04/04/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-medium text-green-800 tracking-customTight",
                      !areValuesVisible && "blur-sm",
                    )}
                  >
                    {formatCurrency(20000)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
