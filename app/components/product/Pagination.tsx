import { Link } from "react-router";

type PaginationProps = {
  page: number;
  totalPages: number;
  buildLink: (page: number) => string;
};

export function Pagination({ page, totalPages, buildLink }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-end gap-2 text-sm">
      {pages.map((p) => (
        <Link
          key={p}
          to={buildLink(p)}
          className={`flex h-7 w-7 items-center justify-center rounded ${
            p === page ? "bg-gray-900 text-white" : "text-gray-700"
          }`}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && <Link to={buildLink(page + 1)}>›</Link>}
    </nav>
  );
}