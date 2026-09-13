import type { Product } from "~/lib/api";
import { ProductGrid } from "./ProductGrid";
import { SortDropdown } from "./SortDropdown";
import { Pagination } from "./Pagination";

type ProductsPanelProps = {
  products: Product[];
  sort?: string;
  onSortChange: (value: string) => void;
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  buildPageLink: (page: number) => string;
};

export function ProductsPanel({
  products,
  sort,
  onSortChange,
  page,
  totalPages,
  total,
  pageSize,
  buildPageLink,
}: ProductsPanelProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SortDropdown value={sort} onChange={onSortChange} />
        <p className="text-sm text-gray-500">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)}{" "}
          of {total}
        </p>
      </div>

      <ProductGrid products={products} />

      <Pagination
        page={page}
        totalPages={totalPages}
        buildLink={buildPageLink}
      />
    </div>
  );
}
