import type { ApiResponse } from "../common/types";

export type User = {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

export type UsersListResponse = ApiResponse<User[], { total: number }>;
