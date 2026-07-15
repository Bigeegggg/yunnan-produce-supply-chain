export interface Product {
  id: string;
  name: string;
  category: "水果类" | "叶菜类" | "茄果类" | "根茎类" | "菌类";
  origin: string;
  season: string;
  spec: string;
  image: string;
  description: string;
}

export interface Advantage {
  title: string;
  description: string;
  icon: string;
}

export const PRODUCT_CATEGORIES = ["全部", "叶菜类", "茄果类", "根茎类", "水果类", "菌类"] as const;
