import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "./client";
import type { ProductInput, ProductsListParams } from "./types";

export const PRODUCTS_QUERY_KEY = "products";

  export function useProductsQuery(params?: ProductsListParams) {
  // A unique query key based on the settings to ensure strong cache
  const queryKey =
    params &&
    Object.keys(params).length > 0 
      ? [PRODUCTS_QUERY_KEY, params]
      : [PRODUCTS_QUERY_KEY];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(params),
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductInput) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    },
  });
}
