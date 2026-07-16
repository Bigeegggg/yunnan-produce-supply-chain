const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "..", "data", "app.db"));

const images = {
  "宾川红提": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80",
  "昭通糖心苹果": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80",
  "元谋番茄": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80",
  "蒙自石榴": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
  "通海叶菜": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
  "丽江雪桃": "https://images.unsplash.com/photo-1606293530245-f5b6a20fe9c4?w=600&q=80",
  "文山三七": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
  "楚雄野生菌": "https://images.unsplash.com/photo-1606494794470-242a69acae45?w=600&q=80",
  "大理紫皮蒜": "https://images.unsplash.com/photo-1615477553856-f2ae9620fa9c?w=600&q=80",
};

for (const [name, image] of Object.entries(images)) {
  db.prepare("UPDATE products SET image = ? WHERE name = ?").run(image, name);
  console.log(`Updated: ${name}`);
}

db.close();
console.log("Done!");
