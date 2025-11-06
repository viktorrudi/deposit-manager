import { Building2 } from "lucide-react";

import { useCompaniesQuery } from "../../../../api/company/hooks";
import { MetricCard } from "../../../../components/metric-card";
import { getApiErrorMessage, isSuccessResponse } from "../../../../api/common/utils";

export function CompaniesCard() {
  const { data: companiesResponse, isLoading, error } = useCompaniesQuery();

  const isSuccess = isSuccessResponse(companiesResponse);
  const companiesCount = isSuccess ? companiesResponse.total : undefined;
  const errorMessage = error ? getApiErrorMessage(error) : undefined;

  return (
    <MetricCard
      title="Companies"
      description="Registered companies"
      icon={<Building2 className="size-5" />}
      isLoading={isLoading}
      errorMessage={errorMessage}
      value={companiesCount}
    />
  );
}
