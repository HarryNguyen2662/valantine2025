import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicImage = path.join(__dirname, "..", "public", "image");
const outPath = path.join(__dirname, "..", "src", "data", "gallery.json");

const CATEGORY_META = {
  chicago: {
    name: "Chicago",
    description: "Kỉ niệm ở Chicago",
  },
  first_5_days: {
    name: "First 5 Days",
    description: "Năm ngày đầu bên nhau",
  },
  long_distance: {
    name: "Long Distance",
    description: "Những ngày xa cách",
  },
  message: {
    name: "Message",
    description: "Tin nhắn & khoảnh khắc",
  },
  new_york: {
    name: "New York",
    description: "Chuyến New York",
  },
  together_at_beloit: {
    name: "Together at Beloit",
    description: "Cùng nhau ở Beloit",
  },
  "Đồ ăn": {
    name: "Đồ ăn",
    description: "Những bữa ăn cùng nhau",
  },
};

const ext = (f) => /\.(jpe?g|png|webp|gif)$/i.test(f);

const categories = [];

for (const dir of fs.readdirSync(publicImage)) {
  const dirPath = path.join(publicImage, dir);
  if (!fs.statSync(dirPath).isDirectory() || dir.startsWith(".")) continue;

  const images = fs
    .readdirSync(dirPath)
    .filter(ext)
    .map((file) => `/image/${dir}/${file}`);

  const meta = CATEGORY_META[dir] || {
    name: dir.replace(/_/g, " "),
    description: "",
  };

  categories.push({
    id: dir,
    name: meta.name,
    description: meta.description,
    images,
  });
}

// Thứ tự hiển thị category trong gallery
const order = [
  "first_5_days",
  "long_distance",
  "message",
  "chicago",
  "new_york",
  "together_at_beloit",
  "Đồ ăn",
];
categories.sort(
  (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ categories }, null, 2), "utf8");
console.log("Gallery built:", categories.map((c) => `${c.id}: ${c.images.length} images`).join(", "));
