import type { Category } from "~/lib/api";

type CategoriesPanelProps = {
  categories: Category[];
  activeCategory?: string;
  onSelect: (slug: string | undefined) => void;
};

export function CategoriesPanel({ categories, activeCategory, onSelect }: CategoriesPanelProps) {
  return (
    <aside className="w-48 shrink-0">
      <p className="mb-3">Categories</p>
      <ul className="space-y-2.5 text-sm text-gray-700">
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