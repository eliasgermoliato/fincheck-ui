import { Outlet } from "react-router-dom";
import illustration from "../../assets/illustration.png";
import { Logo } from "../components/Logo";

export function AuthLayout() {
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full flex flex-col items-center justify-center gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="max-w-[504px] w-full px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full p-8 justify-center items-center relative hidden lg:flex">
        <img
          src={illustration}
          className="object-cover max-w-[656px] max-h-[960px] w-full h-full rounded-[32px] select-none"
          alt="Ilustração da plataforma"
        />

        <div className="max-w-[656px] bottom-8 p-10 absolute rounded-b-[32px] bg-white">
          <Logo className="h-8 text-teal-900 " />
          <p className="text-xl mt-6 font-medium text-gray-700">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
