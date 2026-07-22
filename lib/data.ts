import "server-only";
import { getDb, initDb } from "./db";

export interface Product {
  id: number; name: string; name_en: string; category: string; origin: string; origin_en: string;
  season: string; spec: string; image: string; description: string; description_en: string;
  published: number;
}

export interface Settings {
  [key: string]: string;
}

const isVercel = process.env.VERCEL === "1";

let _settingsCache: Settings | null = null;
let _cacheTime = 0;

export function getPublishedProducts(): Product[] {
  if (isVercel) {
    // On Vercel, read from JSON files bundled with the deployment
    try {
      const products = require("@/data/products.json");
      return products.filter((p: any) => p.published !== 0);
    } catch { return []; }
  }
  initDb();
  const db = getDb();
  return db.prepare("SELECT * FROM products WHERE published = 1 ORDER BY updated_at DESC").all() as Product[];
}

export function getSettings(): Settings {
  if (isVercel) {
    try {
      const advantages = require("@/data/advantages.json");
      const defaults: Settings = {
        company_name: "云南高原供应链", company_phone: "", company_email: "", company_address: "",
        company_wechat: "", about_text: "", about_image: "",
        advantage_1_title: advantages[0]?.title || "源头种植",
        advantage_1_desc: advantages[0]?.description || "",
        advantage_2_title: advantages[1]?.title || "冷链直发",
        advantage_2_desc: advantages[1]?.description || "",
        advantage_3_title: advantages[2]?.title || "品控溯源",
        advantage_3_desc: advantages[2]?.description || "",
      };
      return defaults;
    } catch { return {}; }
  }
  const now = Date.now();
  if (_settingsCache && now - _cacheTime < 5000) return _settingsCache;
  initDb();
  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  const settings: Settings = {};
  for (const row of rows) { settings[row.key] = row.value; }
  _settingsCache = settings;
  _cacheTime = now;
  return settings;
}
