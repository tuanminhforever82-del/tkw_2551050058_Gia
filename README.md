Sản phẩm: StudyFlow
Tiêu đề: StudyFlow - Lên kế hoạch học tập, tiến bộ nhìn thấy được cho học sinh , sinh viên một cách hiệu quả
Chọn màu:
+ Màu thương hiệu chính: Màu đen #0b1220
+ Màu nhấn: Màu xanh dương #2F5FF6
+ Chữ chính: Màu đen #0b1220
+ Chữ phụ: Màu xám xanh #5B6478
+ Nền trang: Màu trắng #FFFFFF
+ Viền: Màu xám nhạt #E4E7EE
Phông tiêu đề: Space Grotesk
Phông nội dung: Inter

## 👤 Thông Tin Sinh Viên
* **Họ và tên:** Trần Nguyễn Hoàng Gia
* **Mã số sinh viên:** 2551050058
* **Lớp / Khóa:** K25 - Khoa Công nghệ Thông tin
* **Trường:** Đại học Mở TP.HCM (HCMOU)

---

## 🛠️ Công Nghệ & Công Cụ Sử Dụng

| Công nghệ / Công cụ | Vai trò trong dự án |
| :--- | :--- |
| **HTML5 Semantic** | Xây dựng cấu trúc trang web chuẩn SEO & Accessibility (WCAG) |
| **Tailwind CSS v4** | Framework CSS biên dịch qua CLI (`@tailwindcss/cli`), sử dụng CSS-first configuration với `@theme` |
| **JavaScript / Node.js** | Môi trường quản lý gói phụ thuộc và chạy script build dev |
| **Git & GitHub** | Quản lý phiên bản mã nguồn (VCS) và lưu trữ dự án |
| **VS Code & Live Server** | Công cụ lập trình và chạy thử nghiệm thời gian thực |
Đây là **kết quả của Buổi 1**, dùng làm điểm xuất phát cho Buổi 2[cite: 4].  
Dự án: **Mô-tôPro** — Phần mềm quản lý Showroom Motor PKL.

---

## 🚀 Các Bước Đã Thực Hiện (Implementation Steps)

### 1. Khởi Tạo Dự Án & Cấu Hình Tailwind CSS v4
* Khởi tạo dự án Node.js với `package.json`.
* Cài đặt **Tailwind CSS v4** và cấu hình các **Custom Design Tokens** trong `src/input.css` bằng directive `@theme`:
  * **Brand Colors:** Brand main, Accent (Vàng sáp), Ink/Muted (Chữ & nền)...
  * **Typography:** Font family `Inter` chuẩn sans-serif.
  * **Custom Variables:** Radius, Muted colors, Line colors.
* Thiết lập lệnh biên dịch tự động trong `package.json`:
  ```json
  "scripts": {
    "dev": "npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch"
  }

```

### 2. Xây Dựng Khung Semantic HTML (10 Sections)

* Dựng cấu trúc trang hoàn toàn bằng thẻ Semantic HTML5, đáp ứng tiêu chuẩn Accessibility:
1. **Navbar Section:** Thanh điều hướng sticky với logo và các liên kết chính.
2. **Hero Section:** Tiêu đề chính `<h1>` duy nhất, mô tả giải pháp và nút Call-to-Action (CTA).
3. **Partners / Client Logos:** Danh sách thương hiệu tin dùng (`DUCATI`, `KAWASAKI`, `BMW MOTORRAD`...).
4. **Features Section:** 3 tính năng cốt lõi (Quản lý số khung VIN, Hợp đồng tự động, Lịch bảo dưỡng).
5. **Statistics Section:** Con số ấn tượng chứng minh hiệu quả vận hành.
6. **Testimonials Section:** Đánh giá từ khách hàng thực tế (`<blockquote>` & `<cite>`).
7. **Pricing Section:** Bảng giá 3 gói dịch vụ (Khởi Nghiệp, Chuyên Nghiệp, Chuỗi Showroom).
8. **FAQ Section:** Các câu hỏi thường gặp về dùng thử và bảo mật.
9. **CTA Section:** Banner kêu gọi hành động chuyển đổi cuối trang.
10. **Footer Section:** Thông tin bản quyền, liên kết phụ và thông tin tác giả.



### 3. Tối Ưu Hóa Accessibility (a11y)

* Tích hợp liên kết **"Skip to main content"** (`.sr-only`) hỗ trợ phím `Tab` và Screen Reader.
* Mỗi `<section>` đều được gán `aria-labelledby` nối trực tiếp với ID của Heading tương ứng.
* Thứ bậc Heading nhảy chuẩn từ `<h1>` -> `<h2>` -> `<h3>`, không bỏ tầng.

### 4. Styling & Hoàn Thiện Giao Diện

* Áp dụng toàn bộ class Tailwind v4 để dựng Layout Responsive (Grid & Flexbox).
* Thiết kế giao diện hiện đại, chuẩn SaaS với hiệu ứng Hover, Shadow, Gradient và Backdrop Blur.
## 1. Chạy dự án

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
tkw_2551050146_Nam/
├── dist/
│   └── output.css        # File CSS đã được Tailwind biên dịch
├── src/
│   └── input.css         # File CSS gốc chứa @import "tailwindcss" và @theme tokens
├── index.html            # Trang HTML Semantic chính
├── package.json          # Quản lý script và dependencies
├── README.md             # Tài liệu hướng dẫn dự án
└── .gitignore            # Khai báo bỏ qua node_modules/

```

---

## 💻 Hướng Dẫn Chạy Dự Án Cục Bộ (Local Setup)

1. **Clone repository về máy:**
```bash
git clone [https://github.com/tuanminhforever82-del/tkw_2551050058_Gia.git](https://github.com/tuanminhforever82-del/tkw_2551050058_Gia.git)
cd tkw_2551050058_Gia

```


2. **Cài đặt phụ thuộc:**
```bash
npm install

```


3. **Biên dịch CSS & Chạy chế độ Dev:**
```bash
npm run dev
```[cite: 4]

```
Mở `index.html` bằng **Live Server** của VS Code[cite: 4]. Đừng nháy đúp vào file: từ buổi 5 trở đi trang cần đọc dữ liệu qua HTTP[cite: 4].


4. Mở `index.html` bằng **Live Server** trên VS Code để xem giao diện trực tiếp trên trình duyệt.

```
**Để nguyên terminal đang chạy `npm run dev` suốt buổi.** Đây là lỗi số một: tắt terminal, sửa HTML, thấy không đổi gì, rồi kết luận Tailwind hỏng[cite: 4].

---

### 📤 Đẩy file cập nhật lên GitHub:
## 2. Trong này đã có sẵn gì

Dán đè vào `README.md`, nhấn **`Ctrl + S`** rồi gõ 3 dòng lệnh quen thuộc này dưới Terminal:
| Phần | Trạng thái |
|---|---|
| Cấu hình Tailwind v4, script `dev` / `build` | Xong[cite: 4] |
| `src/input.css` — 20 design token, lớp base, component | Xong[cite: 4] |
| Khung HTML semantic đầy đủ | Xong[cite: 4] |
| Navbar, kể cả markup menu mobile | Xong, đã style[cite: 4] |
| Hero + khối đặc trưng "Phiếu đặt cọc xe" | Xong, đã style[cite: 4] |
| 8 section còn lại | Khung semantic thô, chưa style layout[cite: 4] |

```bash
git add README.md
git commit -m "docs: bo sung bang design tokens mau sac vao README.md"
git push origin main
---

## 3. Checklist buổi-1

```
- [x] `npm run dev` chạy được; sửa HTML là CSS cập nhật[cite: 4]
- [x] `src/input.css` khai báo ít nhất 8 token màu và 2 phông chữ[cite: 4]
- [x] `index.html` có đủ khung 10 section, đúng một `<h1>`, thứ bậc heading không nhảy cóc[cite: 4]
- [x] Mỗi section có heading nối bằng `aria-labelledby`[cite: 4]
- [x] Navbar và hero khớp thiết kế ở 1440px[cite: 4]
- [x] Có commit rõ ràng và đã gắn tag `buoi-1`[cite: 4]