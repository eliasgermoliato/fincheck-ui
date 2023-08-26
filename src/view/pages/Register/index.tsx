import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "../../../app/hooks/useControllers/useRegisterController";

export function Register() {
  const { errors, handleSubmit, register, isLoading } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px] text-gray-900">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="tracking-[-0.5px] text-gray-700">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="font-medium tracking-[-0.5px] text-teal-900"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          placeholder="Nome"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          placeholder="Sobrenome"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
