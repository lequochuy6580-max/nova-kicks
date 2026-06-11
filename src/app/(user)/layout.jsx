import { CartProvider } from "@/components/CartContext";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nova Kicks - Premium Streetwear Hub</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style>{`
          /* Custom CSS Minimalist phong cách Cyber/Streetwear */
          :root {
            color-scheme: dark;
            --bg: #04050b;
            --bg-soft: #0f1320;
            --surface: rgba(15, 19, 32, 0.92);
            --surface-strong: rgba(9, 12, 20, 0.96);
            --border: rgba(255, 255, 255, 0.08);
            --text: #f8f9fb;
            --muted: #9ba3b3;
            --accent: #ffb03c;
            --accent-soft: rgba(255, 176, 60, 0.14);
          }

          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            min-height: 100vh;
            background: radial-gradient(circle at top left, rgba(255, 176, 60, 0.08), transparent 24%),
                        linear-gradient(180deg, #090b13 0%, #04050b 45%, #030307 100%);
            color: var(--text);
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            letter-spacing: 0.015em;
            line-height: 1.6;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .bg-black {
            background-color: #000000 !important;
          }

          .fw-black {
            font-weight: 900;
          }

          .tracking-wider {
            letter-spacing: 0.14em;
          }

          .tracking-widest {
            letter-spacing: 0.24em;
          }

          .fs-7 {
            font-size: 0.78rem;
          }

          .min-w-300 {
            min-width: 300px;
          }

          .img-hover-scale {
            transition: transform 0.35s ease, box-shadow 0.35s ease;
          }

          .img-hover-scale:hover {
            transform: scale(1.06);
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.3);
          }

          .glass-card {
            background: var(--surface);
            border: 1px solid var(--border);
            backdrop-filter: blur(18px);
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
          }

          .glass-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 30px 85px rgba(0, 0, 0, 0.32);
          }

          .section-muted {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 100%);
          }

          .hero-overlay {
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.85));
          }

          .text-soft {
            color: var(--muted) !important;
          }

          .btn-accent {
            background-color: var(--accent);
            border-color: transparent;
            color: #080708;
            transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          }

          .btn-accent:hover,
          .btn-accent:focus {
            transform: translateY(-1px);
            opacity: 0.95;
            box-shadow: 0 16px 32px rgba(255, 176, 60, 0.2);
            color: #080708;
          }

          .btn-outline-light {
            border-color: rgba(255, 255, 255, 0.35);
            color: #f8f9fb;
          }

          .btn-outline-light:hover,
          .btn-outline-light:focus {
            background-color: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.6);
          }

          .navbar {
            background: rgba(7, 10, 18, 0.96) !important;
          }

          .navbar .nav-link {
            color: rgba(255, 255, 255, 0.78);
            transition: color 0.2s ease;
          }

          .navbar .nav-link:hover,
          .navbar .nav-link.active {
            color: #ffffff;
          }

          .navbar .nav-link.active {
            text-shadow: 0 0 16px rgba(255, 176, 60, 0.18);
          }

          .section-heading {
            position: relative;
          }

          .section-heading::after {
            content: "";
            display: block;
            width: 4rem;
            height: 2px;
            margin-top: 1rem;
            background: linear-gradient(90deg, var(--accent), rgba(255, 176, 60, 0.2));
          }

          .feature-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.45rem 0.9rem;
            background: rgba(255, 176, 60, 0.12);
            border: 1px solid rgba(255, 176, 60, 0.18);
            border-radius: 999px;
            color: var(--text);
            font-size: 0.75rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .card-product {
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: #020307;
          }

          .card-product .card-body {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .card-product .card-title {
            letter-spacing: 0.08em;
          }

          .badge-soft {
            background: rgba(255, 255, 255, 0.08);
            color: var(--text);
          }

          .footer .text-secondary {
            color: rgba(255, 255, 255, 0.65) !important;
          }

          .form-control,
          .form-select {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #f8f9fb;
          }

          .form-control:focus,
          .form-select:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 176, 60, 0.45);
            box-shadow: 0 0 0 0.15rem rgba(255, 176, 60, 0.16);
            color: #ffffff;
          }
        `}</style>
      </head>
      <body className="d-flex flex-column min-vh-100 bg-black text-white">
        
        {/* HEADER BAR ĐEN TUYỀN THEO HÌNH MẪU */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary fixed-top py-3">
          <div className="container">
            <Link className="navbar-brand fw-black tracking-widest text-uppercase fs-4" href="/">
              NOVA KICKS
            </Link>
            
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            {/* LINKS DI CHUYỂN CĂN GIỮA / PHẢI TINH TẾ */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto text-uppercase small fw-bold tracking-wide gap-3">
                <li className="nav-item">
                  <Link className="nav-link text-white active" href="/">Trang chủ</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" href="/products">Bộ sưu tập</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" href="/about">Thương hiệu</Link>
                </li>
              </ul>
              
              <ul className="navbar-nav text-uppercase small fw-bold tracking-wide gap-2 align-items-center">
                <li className="nav-item">
                  <Link className="nav-link text-white position-relative" href="/cart">
                    Giỏ hàng 🛒
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" href="/login">Đăng nhập</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-outline-light rounded-0 px-3 text-uppercase fw-bold" href="/register">Đăng ký</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* CONTAINER CHỨA LOGIC GIỎ HÀNG TOÀN CỤC */}
        <CartProvider>
          {children}
        </CartProvider>

        {/* ================= FOOTER ĐEN TỐI GIẢN THEO MẪU ================= */}
        <footer className="bg-black text-white border-top border-secondary py-5 mt-auto small">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6 text-start">
                <h5 className="fw-black tracking-widest text-uppercase mb-3">NOVA KICKS</h5>
                <p className="text-secondary m-0">Nền tảng cung cấp và phân phối các dòng giày Streetwear cao cấp dẫn đầu xu hướng thị trường.</p>
              </div>
              <div className="col-md-6 text-md-end text-start">
                <p className="text-white fw-bold mb-1">Hotline: 0123 456 789</p>
                <p className="text-secondary mb-1">Email: support@nova-kicks.com</p>
                <p className="text-secondary m-0">&copy; 2026 Nova-kicks. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}