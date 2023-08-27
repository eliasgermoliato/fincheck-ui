import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/usersService";

export default function useCurrentUserQuery(enabled = false) {
  const query = useQuery({
    queryKey: ["users", "currentUser"],
    queryFn: () => userService.currentUser(),
    enabled,
  });

  return { ...query };
}
