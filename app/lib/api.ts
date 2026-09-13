const BASE_URL = "https://dummyjson.com";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

type GetProductsParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string;
};

export async function getProducts({
  page = 1,
  limit = 12,
  sortBy,
  order,
  category,
}: GetProductsParams = {}): Promise<ProductsResponse> {
  const skip = (page - 1) * limit;

  const searchParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    searchParams.set("sortBy", sortBy);
    searchParams.set("order", order ?? "asc");
  }

  const path = category
    ? `/products/category/${category}`
    : "/products";

  const res = await fetch(`${BASE_URL}${path}?${searchParams}`);
  if (!res.ok) {
    throw new Response("Failed to fetch products", { status: res.status });
  }
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Response("Product not found", { status: 404 });
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Response("Failed to fetch categories", { status: res.status });
  }
  return res.json();
}