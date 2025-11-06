import { Milk } from "lucide-react";

import { useProductsQuery } from "../../../../api/product/hooks";
import { MetricCard } from "../../../../components/metric-card";
import { RECENT_ACTIVE_PRODUCTS_PARAMS } from "../../../../api/product/types";
import { getApiErrorMessage, isSuccessResponse } from "../../../../api/common/utils";

export function ActiveProductsCard() {
  const { data: productsResponse, isLoading, error } = useProductsQuery(RECENT_ACTIVE_PRODUCTS_PARAMS);
  const isSuccess = isSuccessResponse(productsResponse);

  const activeProductsCount = isSuccess ? productsResponse.pagination.totalItems : undefined;
  const errorMessage = error ? getApiErrorMessage(error) : undefined;

  return (
    <MetricCard
      title="Active products"
      description="Active products in system"
      icon={<Milk className="size-5" />}
      isLoading={isLoading}
      errorMessage={errorMessage}
      value={activeProductsCount}
    />
  );
}
