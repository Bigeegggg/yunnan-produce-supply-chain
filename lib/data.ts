import { getDb, initDb } from "./db";

export interface Product {
  id: number; name: string; category: string; origin: string;
  season: string; spec: string; image: string; description: string;
  published: number;
}

export interface Settings {
  [key: string]: string;
}

let _settingsCache: Settings | null = null;
let _cacheTime = 0;

export function getPublishedProducts(): Product[] {
  initDb();
  const db = getDb();
  return db.prepare("SELECT * FROM products WHERE published = 1 ORDER BY updated_at DESC").all() as Product[];
}

export function getSettings(): Settings {
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
