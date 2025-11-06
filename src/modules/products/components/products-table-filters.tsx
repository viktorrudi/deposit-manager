import { Button } from "../../../components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";

export type ProductsStatusFilter = "all" | "active" | "inactive";

type ProductsTableFiltersProps = {
  statusFilter: ProductsStatusFilter;
  onStatusFilterChange: (value: ProductsStatusFilter) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  isFilterApplied: boolean;
  onResetFilters: () => void;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

export function ProductsTableFilters({
  statusFilter,
  onStatusFilterChange,
  pageSize,
  onPageSizeChange,
  isFilterApplied,
  onResetFilters,
}: ProductsTableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as ProductsStatusFilter)}
      >
        <SelectTrigger size="sm" className="min-w-[160px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
        <SelectTrigger size="sm" className="min-w-[160px]">
          <SelectValue placeholder="Page size" />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option} per page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isFilterApplied ? (
        <Button variant="ghost" size="sm" type="button" onClick={onResetFilters}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}

