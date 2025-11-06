import type { ApiResponse } from "../common/types";

export type Company = {
  id: number;
  name: string;
  registeredAt: string;
};

export type CompaniesListResponse = ApiResponse<Company[], { total: number }>;
