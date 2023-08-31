import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { BankAccountType } from "../../../../../interfaces/BankAccount";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const { sliderState, setSliderState } = useAccountsController();
  return (
    <div className="w-full h-full rounded-2xl px-4 py-8 flex flex-col bg-teal-900 md:p-10">
      <div>
        <span className="block tracking-customTight text-white">
          Saldo total
        </span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-customTighter text-white">
            R$ 1000,00
          </strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
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

              <AccountsSliderNavigation
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
      </div>
    </div>
  );
}
