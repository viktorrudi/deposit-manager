import type { ReactNode } from "react";
import type { Product } from "../../../api/product/types";
import { Badge } from "../../../components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/table";
import { Skeleton } from "../../../components/skeleton";
import {
  formatProductDeposit,
  formatProductPackaging,
  formatProductRegisteredAt,
  formatProductStatus,
  formatProductVolume,
} from "../../home/utils";

type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
  errorMessage?: string;
  resolveCompanyName: (companyId: number) => string;
  resolveUserName: (userId: number) => string;
};

const SKELETON_ROWS = 10;
const COLUMN_COUNT = 8;

export function ProductsTable({
  products,
  isLoading,
  errorMessage,
  resolveCompanyName,
  resolveUserName,
}: ProductsTableProps) {
  let tableContent: ReactNode;

  if (isLoading) {
    tableContent = Array.from({ length: SKELETON_ROWS }).map((_, index) => (
      <TableRow key={`products-skeleton-${index}`}>
        <TableCell className="px-4 py-4 align-middle">
          <div className="space-y-1">
            <div className="font-medium text-foreground">
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="text-xs text-muted-foreground">
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
        </TableCell>
        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell className="px-4 py-4 text-right text-sm text-muted-foreground">
          <Skeleton className="ml-auto h-4 w-16" />
        </TableCell>
        <TableCell className="px-4 py-4 text-right text-sm font-medium text-foreground">
          <Skeleton className="ml-auto h-4 w-16" />
        </TableCell>
        <TableCell className="px-4 py-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </TableCell>
        <TableCell className="px-4 py-4 text-right text-sm text-muted-foreground">
          <Skeleton className="ml-auto h-4 w-28" />
        </TableCell>
      </TableRow>
    ));
  } else if (errorMessage) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={COLUMN_COUNT} className="px-4 py-6 text-sm font-medium text-destructive">
          {errorMessage}
        </TableCell>
      </TableRow>
    );
  } else if (products.length === 0) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={COLUMN_COUNT} className="px-4 py-6 text-sm text-muted-foreground">
          No products match the selected filters.
        </TableCell>
      </TableRow>
    );
  } else {
    tableContent = products.map((product) => (
      <TableRow key={product.id}>
        <TableCell className="px-4 py-4 align-middle">
          <div className="space-y-1">
            <p className="font-medium text-foreground">{product.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatProductVolume(product.volume)} &middot; {formatProductDeposit(product.deposit)} deposit
            </p>
          </div>
        </TableCell>
        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
          {resolveCompanyName(product.companyId)}
        </TableCell>
        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
          {resolveUserName(product.registeredById)}
        </TableCell>
        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
          {formatProductPackaging(product.packaging)}
        </TableCell>
        <TableCell className="px-4 py-4 text-right text-sm text-muted-foreground">
          {formatProductVolume(product.volume)}
        </TableCell>
        <TableCell className="px-4 py-4 text-right text-sm font-medium text-foreground">
          {formatProductDeposit(product.deposit)}
        </TableCell>
        <TableCell className="px-4 py-4">
          <Badge variant={product.active ? "default" : "secondary"}>{formatProductStatus(product.active)}</Badge>
        </TableCell>
        <TableCell className="px-4 py-4 text-right text-sm text-muted-foreground">
          {formatProductRegisteredAt(product.registeredAt)}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-3">Product</TableHead>
          <TableHead className="px-4 py-3">Company</TableHead>
          <TableHead className="px-4 py-3">Registered by</TableHead>
          <TableHead className="px-4 py-3">Packaging</TableHead>
          <TableHead className="px-4 py-3 text-right">Volume</TableHead>
          <TableHead className="px-4 py-3 text-right">Deposit</TableHead>
          <TableHead className="px-4 py-3">Status</TableHead>
          <TableHead className="px-4 py-3 text-right">Registered</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{tableContent}</TableBody>
    </Table>
  );
}
