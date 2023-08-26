import { useMutation } from "@tanstack/react-query";
import { SignupData } from "../../../interfaces/Signup";
import { authService } from "../../../app/services/authService";

export default function useSignupMutation() {
  const mutation = useMutation({
    mutationFn: async (body: SignupData) => {
      return authService.signup(body);
    },
  });

  return { mutateAsync: mutation.mutateAsync, isLoading: mutation.isLoading };
}
