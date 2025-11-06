import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/card";
import { Table, TableBody, TableCell, TableRow } from "../../../components/table";
import { Skeleton } from "../../../components/skeleton";
import { useProductsQuery } from "../../../api/product/hooks";
import { getApiErrorMessage, isSuccessResponse } from "../../../api/common/utils";
import { RECENT_ACTIVE_PRODUCTS_PARAMS } from "../../../api/product/types";
import {
  formatProductDeposit,
  formatProductPackaging,
  formatProductRegisteredAt,
  formatProductVolume,
} from "../utils";

export function RecentProducts() {
  const { data: productsResponse, isLoading, error } = useProductsQuery(RECENT_ACTIVE_PRODUCTS_PARAMS);

  const isSuccess = isSuccessResponse(productsResponse);
  const products = isSuccess ? productsResponse.data : [];
  const errorMessage = error ? getApiErrorMessage(error) : undefined;

  let tableRows: ReactNode;

  if (isLoading) {
    tableRows = Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={`recent-products-skeleton-${index}`}>
        <TableCell className="px-6 py-4">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-foreground">
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
          </div>
        </TableCell>
        <TableCell className="px-6 py-4 text-right text-sm text-muted-foreground">
          <Skeleton className="ml-auto h-4 w-28" />
        </TableCell>
      </TableRow>
    ));
  } else if (errorMessage || !isSuccess) {
    tableRows = (
      <TableRow>
        <TableCell className="px-6 py-6 text-sm font-medium text-destructive" colSpan={2}>
          {errorMessage || "Something went wrong while loading data."}
        </TableCell>
      </TableRow>
    );
  } else if (products.length === 0) {
    tableRows = (
      <TableRow>
        <TableCell className="px-6 py-6 text-sm text-muted-foreground" colSpan={2}>
          No recent products to display.
        </TableCell>
      </TableRow>
    );
  } else {
    tableRows = products.map((product) => (
      <TableRow key={product.id}>
        <TableCell className="px-6 py-4">
          <p className="text-sm font-semibold text-foreground">{product.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatProductVolume(product.volume)} • {formatProductDeposit(product.deposit)} deposit •{" "}
            {formatProductPackaging(product.packaging)}
          </p>
        </TableCell>
        <TableCell className="px-6 py-4 text-right text-sm text-muted-foreground">
          {formatProductRegisteredAt(product.registeredAt)}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Card className="shadow-xs">
      <CardHeader className="border-b border-border pb-5">
        <CardTitle className="text-xl font-semibold">Recent products</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableBody className="[&:first-child]:border-t-0">
            {tableRows}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
