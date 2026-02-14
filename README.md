# Valentine — Gallery kỉ niệm

Website Valentine: **Intro → Gallery kỉ niệm → Lời chúc**. Dùng như gallery lưu trữ & chia sẻ kỉ niệm của hai bạn.

## Flow

1. **Intro** — Màn hình mở đầu với particle nhẹ, headline và nút xuống Gallery.
2. **Gallery** — Ảnh kỉ niệm dạng Polaroid (hover: đổi từ B&W sang màu), mỗi ảnh có ngày + caption.
3. **Lời chúc Valentine** — Đoạn chữ tùy chỉnh + bộ đếm thời gian bên nhau (ngày, giờ, phút, giây).

## Chỉnh nội dung

Mở **`src/data/memories.ts`**:

- `coupleNames`: tên hiển thị trên intro.
- `togetherSince`: ngày bắt đầu (YYYY-MM-DD) cho bộ đếm.
- `gallery`: mảng ảnh — mỗi item có `src` (đường dẫn trong `/public`), `date`, `title`, `description`.
- `wishes`: mảng đoạn văn lời chúc.
- `closing`: dòng kết.

## Thêm ảnh

Đặt ảnh vào **`public/gallery/`** (vd: `photo_1.jpg`, `photo_2.jpg`) và khai báo trong `gallery` ở `memories.ts`.

## Chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Deploy lên Netlify

1. **Đẩy code lên GitHub**: Repo đã được `git init`, commit, branch `main`. Chỉ cần:
   - Tạo repo mới trên GitHub: [github.com/new](https://github.com/new) → đặt tên (vd: `valantine`) → **Create repository** (không tick README).
   - Chạy (thay `<username>` bằng GitHub username của bạn):
   ```bash
   git remote remove origin
   git remote add origin https://github.com/<username>/valantine.git
   git push -u origin main
   ```
   Lưu ý: thư mục `public/image/` có nhiều ảnh — nếu repo quá nặng có thể dùng [Git LFS](https://git-lfs.com/) hoặc bỏ qua ảnh và dùng ảnh từ CDN sau.

2. **Kết nối với Netlify**:
   - Vào [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
   - Chọn **GitHub** (hoặc GitLab/Bitbucket), authorize, chọn repo và branch (vd. `main`).
   - Netlify tự nhận Next.js; **Build command** để mặc định `npm run build` (đã có trong `netlify.toml`).
   - **Publish directory** để trống (Next.js do Netlify tự xử lý).
   - Bấm **Deploy site**.

3. **Sau khi deploy**: Netlify cho một URL dạng `https://<tên-site>.netlify.app`. Có thể đổi tên site hoặc thêm custom domain trong **Site settings**.
