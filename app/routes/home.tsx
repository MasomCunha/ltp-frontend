import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { getCategories, getProducts } from "~/lib/api";
import { ProductsPanel } from "~/components/product/ProductsPanel";
import { CategoriesPanel } from "~/components/product/CategoriesPanel";
import { PageWrapper } from "~/components/layout/PageWrapper";

const PAGE_SIZE = 9;

export function meta() {
  return [{ title: "LTP Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const category = url.searchParams.get("category") ?? undefined;
  const sort = url.searchParams.get("sort") ?? undefined;
  const [sortBy, order] = sort ? sort.split("-") : [undefined, undefined];

  const [data, categories] = await Promise.all([
    getProducts({ page, limit: PAGE_SIZE, sortBy, order: order as "asc" | "desc" | undefined, category }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  return { ...data, categories, page, totalPages, category, sort };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products, categories, page, totalPages, category, sort, total } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  function updateParam(key: string, value?: string) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    setSearchParams(params);
  }

  function pageLink(p: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    return `?${params}`;
  }

  return (
    <PageWrapper>
      <div className="flex gap-10">
        <ProductsPanel
          products={products}
          sort={sort}
          onSortChange={(v) => updateParam("sort", v || undefined)}
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={PAGE_SIZE}
          buildPageLink={pageLink}
        />

        <CategoriesPanel
          categories={categories}
          activeCategory={category}
          onSelect={(slug) => updateParam("category", slug)}
        />
      </div>
    </PageWrapper>
  );
}