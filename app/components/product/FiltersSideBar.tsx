import type { Category } from "~/lib/api";

type FiltersSidebarProps = {
  categories: Category[];
  activeCategory?: string;
  onSelect: (slug: string | undefined) => void;
};

export function FiltersSidebar({ categories, activeCategory, onSelect }: FiltersSidebarProps) {
  return (
    <aside className="w-40 shrink-0">
      <h3 className="mb-3 text-sm font-semibold">Categories</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {categories.map((c) => (
          <li key={c.slug} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={activeCategory === c.slug}
              onChange={() => onSelect(activeCategory === c.slug ? undefined : c.slug)}
            />
            <span>{c.name}</span>
          </li>
        ))}
      </ul>
      <hr className="mt-4 border-gray-200" />
    </aside>
  );
}