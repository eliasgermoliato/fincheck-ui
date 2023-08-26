import { useMutation } from "@tanstack/react-query";
import { SigninpData } from "../../../interfaces/Signin";
import { authService } from "../../../app/services/authService";

export default function useSigninMutation() {
  const mutation = useMutation({
    mutationFn: async (body: SigninpData) => {
      return authService.signin(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}
