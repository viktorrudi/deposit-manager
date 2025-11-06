import { UsersRound } from "lucide-react";

import { useUsersQuery } from "../../../../api/user/hooks";
import { MetricCard } from "../../../../components/metric-card";
import { getApiErrorMessage, isSuccessResponse } from "../../../../api/common/utils";

export function UsersCard() {
  const { data: usersResponse, isLoading, error } = useUsersQuery();
  const isSuccess = isSuccessResponse(usersResponse);

  const usersCount = isSuccess ? usersResponse.total : undefined;
  const errorMessage = error ? getApiErrorMessage(error) : undefined;

  return (
    <MetricCard
      title="Users"
      description="Registered users"
      icon={<UsersRound className="size-5" />}
      isLoading={isLoading}
      errorMessage={errorMessage}
      value={usersCount}
    />
  );
}
