import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "app.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export function initDb(): void {
  const database = getDb();

  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      name_en TEXT DEFAULT '',
      category TEXT NOT NULL CHECK(category IN ('水果类','叶菜类','茄果类','根茎类','菌类')),
      origin TEXT NOT NULL,
      origin_en TEXT DEFAULT '',
      season TEXT NOT NULL,
      spec TEXT NOT NULL,
      image TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      description_en TEXT DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL DEFAULT '',
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      quantity TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','contacted','closed')),
      admin_notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS supplier_contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      cooperation_record TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS shipping_methods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT '',
      contact TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS trace_batches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      batch_code TEXT NOT NULL UNIQUE,
      origin_info TEXT DEFAULT '',
      production_info TEXT DEFAULT '',
      testing_info TEXT DEFAULT '',
      logistics_info TEXT DEFAULT '',
      status TEXT DEFAULT 'active' CHECK(status IN ('active','archived')),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER DEFAULT 0,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      platform TEXT DEFAULT 'direct',
      thumbnail TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      status TEXT DEFAULT 'approved' CHECK(status IN ('pending','approved','rejected')),
      submitted_by TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Migrate videos table — add new columns for existing databases
  try { database.exec("ALTER TABLE videos ADD COLUMN status TEXT DEFAULT 'approved' CHECK(status IN ('pending','approved','rejected'))"); } catch {}
  try { database.exec("ALTER TABLE videos ADD COLUMN submitted_by TEXT DEFAULT ''"); } catch {}
  // Set default status for existing rows
  database.prepare("UPDATE videos SET status = 'approved' WHERE status IS NULL OR status = ''").run();

  // Migrate from products.json if empty
  const count = database.prepare("SELECT COUNT(*) as c FROM products").get() as { c: number };
  if (count.c === 0) {
    const productsPath = path.join(process.cwd(), "data", "products.json");
    if (fs.existsSync(productsPath)) {
      const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
      const insert = database.prepare(
        "INSERT INTO products (name, name_en, category, origin, origin_en, season, spec, image, description, description_en, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)"
      );
      const tx = database.transaction(() => {
        for (const p of products) {
          insert.run(p.name, p.name_en || "", p.category, p.origin, p.origin_en || "", p.season, p.spec, p.image || "", p.description || "", p.description_en || "");
        }
      });
      tx();
    }
  }

  // Migrate default settings if empty
  const settingsCount = database.prepare("SELECT COUNT(*) as c FROM settings").get() as { c: number };
  if (settingsCount.c === 0) {
    const defaults: Record<string, string> = {
      company_name: "云南高原供应链",
      company_phone: "",
      company_email: "",
      company_address: "",
      company_wechat_qr: "",
      about_text: "",
      about_image: "",
      hero_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      hero_title: "云南高原蔬果供应链",
      hero_tagline_en: "Yunnan Plateau · Fresh Produce · Global Supply",
      hero_subtitle: "源头种植 · 冷链直发 · 品控溯源\n从云岭高原到您的餐桌，我们守护每一口新鲜",
      advantage_1_title: "源头种植",
      advantage_1_desc: "云南高原自有合作基地，覆盖大理、昭通、楚雄、红河等核心产区，从田间到餐桌全程可控。",
      advantage_2_title: "冷链直发",
      advantage_2_desc: "产地预冷 + 全程冷链物流，48 小时内从云南直达全国主要城市，保证新鲜度。",
      advantage_3_title: "品控溯源",
      advantage_3_desc: "每批次产品可追溯至具体种植地块和农户，通过国家绿色食品认证，农残检测透明。",
    };
    const insert = database.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const tx = database.transaction(() => {
      for (const [key, value] of Object.entries(defaults)) {
        insert.run(key, value);
      }
    });
    tx();
  }
}
