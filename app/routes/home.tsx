import { Form, Link, useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { getCategories, getProducts } from "~/lib/api";

const PAGE_SIZE = 12;

export function meta() {
  return [{ title: "LTP Store" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const category = url.searchParams.get("category") ?? undefined;
  const sort = url.searchParams.get("sort") ?? undefined;

  // "price-desc" -> sortBy: "price", order: "desc"
  const [sortBy, order] = sort ? sort.split("-") : [undefined, undefined];

  const [data, categories] = await Promise.all([
    getProducts({
      page,
      limit: PAGE_SIZE,
      sortBy,
      order: order as "asc" | "desc" | undefined,
      category,
    }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return { ...data, categories, page, totalPages, category, sort };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products, categories, page, totalPages, category, sort } = loaderData;
  const [searchParams] = useSearchParams();

  function pageLink(p: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    return `?${params}`;
  }

  return (
    <main>
      <h1>Products</h1>

      {/* Filtros e ordenação — GET form: submete para o URL, o loader relê */}
      <Form method="get">
        <label>
          Category
          <select name="category" defaultValue={category ?? ""}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select name="sort" defaultValue={sort ?? ""}>
            <option value="">Default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="title-asc">Name: A–Z</option>
            <option value="title-desc">Name: Z–A</option>
            <option value="rating-desc">Rating</option>
          </select>
        </label>

        <button type="submit">Apply</button>
      </Form>

      {/* Lista de produtos */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} width={150} />
              <h2>{product.title}</h2>
              <p>{product.category}</p>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>

      {products.length === 0 && <p>No products found.</p>}

      {/* Paginação */}
      <nav aria-label="Pagination">
        {page > 1 && <Link to={pageLink(page - 1)}>Previous</Link>}
        <span>
          Page {page} of {totalPages}
        </span>
        {page < totalPages && <Link to={pageLink(page + 1)}>Next</Link>}
      </nav>
    </main>
  );
}