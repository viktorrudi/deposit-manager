import { fetchWrapper, type QueryParams } from "../common/fetchWrapper";
import type {
  CreateProductResponse,
  ProductInput,
  ProductsListParams,
  ProductsListResponse,
} from "./types";

const PRODUCTS_ENDPOINT = "/api/products";

function getProductsQueryParams(params?: ProductsListParams): QueryParams | undefined {
  if (!params) {
    return undefined;
  }

  const query: QueryParams = {};

  if (params.page !== undefined) {
    query.page = params.page;
  }

  if (params.limit !== undefined) {
    query.limit = params.limit;
  }

  if (params.active !== undefined) {
    query.active = params.active;
  }

  if (params.sort) {
    query.sort = params.sort;
  }

  if (params.order) {
    query.order = params.order;
  }

  return query;
}

export async function getProducts(params?: ProductsListParams) {
  return fetchWrapper<ProductsListResponse>(PRODUCTS_ENDPOINT, {
    query: getProductsQueryParams(params),
  });
}

export async function createProduct(payload: ProductInput) {
  return fetchWrapper<CreateProductResponse>(PRODUCTS_ENDPOINT, {
    method: "POST",
    body: payload,
  });
}
