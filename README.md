# 👟 Nova Kicks — Premium Streetwear Hub

> Ứng dụng quản lý bán giày thể thao xây dựng với **Next.js 16**, **React 19**, và **MongoDB**.

---

## ✨ Tính năng

| Vai trò | Tính năng |
|---------|-----------|
| 👤 **Khách hàng** | Xem sản phẩm, thêm vào giỏ hàng, đặt hàng |
| 🛠️ **Staff** | Quản lý đơn hàng, cập nhật trạng thái |
| 👑 **Admin** | Quản lý sản phẩm, tài khoản, bàn/khu vực |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: React 19 + Bootstrap 5
- **Database**: MongoDB (via `mongodb` driver)
- **Security**: bcryptjs (mã hóa mật khẩu)
- **Deploy**: Vercel + MongoDB Atlas

---

## 🚀 Cài đặt & Chạy local

### Yêu cầu
- Node.js >= 18.x
- MongoDB (local hoặc [Atlas](https://www.mongodb.com/atlas))

### Bước 1 — Clone repo

```bash
git clone https://github.com/YOUR_USERNAME/nova-kicks.git
cd nova-kicks
```

### Bước 2 — Cài dependencies

```bash
npm install
```

### Bước 3 — Cấu hình môi trường

```bash
cp .env.example .env.local
```

Mở `.env.local` và điền thông tin:

```env
MONGODB_URI=mongodb://localhost:27017/Nova-kicks
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> Nếu dùng MongoDB Atlas, thay `MONGODB_URI` bằng connection string từ Atlas dashboard.

### Bước 4 — Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── (user)/          # Giao diện khách hàng
│   │   ├── page.jsx     # Trang chủ / danh sách sản phẩm
│   │   ├── cart/        # Giỏ hàng & thanh toán
│   │   ├── login/       # Đăng nhập
│   │   └── register/    # Đăng ký
│   ├── admin/           # Dashboard quản trị
│   │   ├── product/     # CRUD sản phẩm
│   │   ├── account/     # Quản lý tài khoản
│   │   └── tables/      # Quản lý đơn hàng
│   ├── staff/           # Giao diện nhân viên
│   └── api/             # API Routes (REST)
│       ├── products/
│       ├── orders/
│       ├── tables/
│       └── users/
├── components/
│   ├── AddToCart.jsx    # Component thêm vào giỏ
│   ├── CartContext.jsx  # Context quản lý giỏ hàng
│   └── StaffOrder.jsx   # Component xử lý đơn hàng
└── libs/
    └── mongodb.js       # Kết nối MongoDB (singleton)
```

---

## ☁️ Deploy lên Vercel

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com) → **New Project** → Import repo
3. Thêm **Environment Variables**:
   - `MONGODB_URI` = connection string từ MongoDB Atlas
   - `NEXT_PUBLIC_BASE_URL` = URL của app sau khi deploy (vd: `https://nova-kicks.vercel.app`)
4. Click **Deploy** ✅

---

## 📝 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Lấy danh sách sản phẩm |
| POST | `/api/products` | Tạo sản phẩm mới |
| PUT | `/api/products/[id]` | Cập nhật sản phẩm |
| DELETE | `/api/products/[id]` | Xóa sản phẩm |
| GET | `/api/orders` | Lấy danh sách đơn hàng |
| POST | `/api/orders` | Tạo đơn hàng mới |
| GET | `/api/users` | Lấy danh sách người dùng |
| POST | `/api/users` | Tạo tài khoản mới |
| GET | `/api/tables` | Lấy danh sách bàn/khu vực |

---

## 🔒 Biến môi trường

| Biến | Bắt buộc | Mô tả |
|------|----------|-------|
| `MONGODB_URI` | ✅ | Connection string của MongoDB |
| `NEXT_PUBLIC_BASE_URL` | ✅ | URL gốc của ứng dụng |

> ⚠️ **Không bao giờ commit file `.env.local` lên GitHub!**

---

## 📄 License

MIT © Nova Kicks Team
