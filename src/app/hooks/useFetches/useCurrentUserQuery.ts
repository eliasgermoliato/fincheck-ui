import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/usersService";

interface CurrentUserQueryProps {
  enabled: boolean;
}

export default function useCurrentUserQuery({
  enabled = false,
}: CurrentUserQueryProps) {
  const query = useQuery({
    queryKey: ["users", "currentUser"],
    queryFn: () => userService.currentUser(),
    enabled,
    staleTime: Infinity,
  });

  return { ...query };
}
