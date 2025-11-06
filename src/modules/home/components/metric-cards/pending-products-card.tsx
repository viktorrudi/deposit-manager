import { CircleDashed } from "lucide-react";
import { useProductsQuery } from "../../../../api/product/hooks";
import { MetricCard } from "../../../../components/metric-card";
import { getApiErrorMessage, isSuccessResponse } from "../../../../api/common/utils";
import { PENDING_PRODUCTS_PARAMS } from "../../../../api/product/types";

export function PendingProductsCard() {
  const { data: productsResponse, isLoading, error } = useProductsQuery(PENDING_PRODUCTS_PARAMS);

  const isSuccess = isSuccessResponse(productsResponse);
  const pendingProductsCount = isSuccess ? productsResponse.pagination.totalItems : undefined;
  const errorMessage = error ? getApiErrorMessage(error) : undefined;

  return (
    <MetricCard
      title="Pending products"
      description="Products waiting for approval"
      icon={<CircleDashed className="size-5" />}
      isLoading={isLoading}
      errorMessage={errorMessage}
      value={pendingProductsCount}
    />
  );
}
