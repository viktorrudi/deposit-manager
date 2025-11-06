import { AlertTriangle } from "lucide-react";

import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";
import { cn } from "../lib/utils";

type MetricCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  isLoading?: boolean;
  errorMessage?: string;
  value?: number;
};

export function MetricCard({ title, description, icon, isLoading, errorMessage, value }: MetricCardProps) {
  const effectiveIcon = errorMessage ? <AlertTriangle className="size-5 text-amber-600" /> : icon;

  let content: ReactNode;

  if (isLoading) {
    content = <Skeleton className="h-9 w-20" />;
  } else if (errorMessage) {
    content = (
      <div className="rounded-md py-2 text-md text-amber-700">
        {errorMessage}
      </div>
    );
  } else {
    const formattedValue = value !== undefined ? value.toLocaleString() : "—";
    content = <span className="text-3xl font-semibold tracking-tight">{formattedValue}</span>;
  }

  return (
    <Card
      className={cn(
        "shadow-xs transition-colors",
        errorMessage && "border-amber-200 bg-amber-50/70"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-base font-medium", errorMessage && "text-amber-700")}>{title}</CardTitle>
        <span className={cn("text-muted-foreground", errorMessage && "text-amber-600")}>{effectiveIcon}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {content}
        {!errorMessage && (
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
