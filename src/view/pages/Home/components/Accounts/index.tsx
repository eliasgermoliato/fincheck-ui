import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { BankAccountType } from "../../../../../interfaces/BankAccount";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
  const {
    areValuesVisible,
    toggleValueVisibility,
    screenSize,
    sliderState,
    setSliderState,
    isLoading,
    accounts,
    openNewAccountModalOpen,
  } = useAccountsController();

  return (
    <div className="w-full h-full rounded-2xl px-4 py-8 flex flex-col bg-teal-900 md:p-10">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10 text-teal-950 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="block tracking-customTight text-white">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-customTighter text-white",
                  !areValuesVisible && "blur-md",
                )}
              >
                {formatCurrency(10000)}
              </strong>
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValueVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {!accounts.length && (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-lg tracking-customTighter text-white">
                    Minhas contas
                  </strong>
                </div>

                <button
                  className="mt-4 h-52 rounded-2xl flex flex-col items-center justify-center gap-4 border-2 border-dashed border-teal-600 text-white"
                  onClick={openNewAccountModalOpen}
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="w-32 text-center font-medium tracking-customTight">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}
            {!!accounts.length && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={!screenSize.xs ? 2.1 : 1.2}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div
                    className="flex items-center justify-between mb-4"
                    slot="container-start"
                  >
                    <strong className="text-lg tracking-customTighter text-white">
                      Minhas contas
                    </strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  <SwiperSlide>
                    <AccountCard
                      color="#7950F2"
                      name="Nubank"
                      balance={1000.23}
                      type={BankAccountType.CHECKING}
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#333"
                      name="XP"
                      balance={1000.23}
                      type={BankAccountType.INVESTMENT}
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#0F0"
                      name="Carteira"
                      balance={1000.23}
                      type={BankAccountType.CASH}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
