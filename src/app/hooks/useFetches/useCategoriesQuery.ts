import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../../services/categoriesService";

export default function useCategoriesQuery() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
  });

  return { ...query };
}
