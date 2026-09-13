type SortOption = { value: string; label: string };

const OPTIONS: SortOption[] = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "title-asc", label: "Name: A–Z" },
  { value: "title-desc", label: "Name: Z–A" },
  { value: "rating-desc", label: "Rating" },
];

type SortDropdownProps = {
  value?: string;
  onChange: (value: string) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm w-26"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.value === "" ? "Sort by" : opt.label}
        </option>
      ))}
    </select>
  );
}