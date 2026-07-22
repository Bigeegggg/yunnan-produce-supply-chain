"use client";

import { useT } from "@/lib/i18n";

interface CategoryFilterProps {
  active: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  const { t } = useT();
  const categories = [t.cat_all, t.cat_fruit, t.cat_leafy, t.cat_solanum, t.cat_root, t.cat_mushroom];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button key={cat} onClick={() => onSelect(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${active === cat ? "bg-primary text-white" : "bg-white text-text-primary/60 hover:text-primary hover:bg-primary/5 border border-sand"}`}>
          {cat}
        </button>
      ))}
    </div>
  );
}
