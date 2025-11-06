import type { ApiResponse } from "../common/types";

export type ProductPackaging = "pet" | "can" | "glass" | "tetra" | "other";

export type ProductSortField = "name" | "registeredAt";

export type SortOrder = "asc" | "desc";

export type Product = {
  id: number;
  companyId: number;
  registeredById: number;
  name: string;
  packaging: ProductPackaging;
  deposit: number;
  volume: number;
  registeredAt: string;
  active: boolean;
};

export type ProductInput = {
  name: string;
  packaging: ProductPackaging;
  deposit: number;
  volume: number;
  companyId: number;
  registeredById: number;
};

export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ProductsListResponse = ApiResponse<Product[], { pagination: PaginationInfo }>;

export type CreateProductResponse = ApiResponse<Product, { message: string }>;

export type ProductsListParams = {
  page?: number;
  limit?: number;
  active?: boolean;
  sort?: ProductSortField;
  order?: SortOrder;
};

export const RECENT_ACTIVE_PRODUCTS_PARAMS: ProductsListParams = {
  active: true,
  limit: 5,
  sort: "registeredAt",
  order: "desc",
};

export const PENDING_PRODUCTS_PARAMS: ProductsListParams = {
  active: false,
  limit: 1,
};
