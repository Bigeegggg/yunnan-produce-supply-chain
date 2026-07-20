const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "..", "data", "app.db"));

// Find 丽江雪桃 product ID
const product = db.prepare("SELECT id FROM products WHERE name = ?").get("丽江雪桃");
if (!product) { console.log("Product not found"); process.exit(1); }

// Insert a sample video — using a free stock video URL
db.prepare("INSERT INTO videos (product_id, title, url, platform, notes) VALUES (?, ?, ?, ?, ?)").run(
  product.id,
  "丽江雪桃种植基地",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "direct",
  "玉龙雪山脚下，海拔2400米高原雪桃种植实拍"
);

console.log("Video added for product ID:", product.id);
db.close();
