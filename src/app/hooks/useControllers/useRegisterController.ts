import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSignupMutation from "../useFetches/useSignupMutation";
import { toast } from "react-hot-toast";
import { useAuth } from "../useAuth";

const schema = z.object({
  firstName: z.string().nonempty("Nome é obrigatório"),
  lastName: z.string().nonempty("Sobrenome é obrigatório"),
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 dígitos"),
});

interface FormData extends z.infer<typeof schema> {}

export function useRegisterController() {
  const { mutateAsync, isLoading } = useSignupMutation();
  const { signin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { firstName, lastName } = data;
      const name = firstName.concat(" ", lastName);

      const { accessToken } = await mutateAsync({
        name,
        ...data,
      });

      signin(accessToken);
    } catch {
      toast.error("Ocorreu um erro ao criar a sua conta!");
    }
  });

  return { register, handleSubmit, errors, isLoading };
}
