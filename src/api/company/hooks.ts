import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "./client";

export const COMPANIES_QUERY_KEY = "companies";

export function useCompaniesQuery() {
  return useQuery({
    queryKey: [COMPANIES_QUERY_KEY],
    queryFn: getCompanies,
  });
}
