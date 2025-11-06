import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./client";

export const USERS_QUERY_KEY = "users";

export function useUsersQuery() {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: getUsers,
  });
}
