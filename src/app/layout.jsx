export const metadata = {
  title: 'Nova Kicks - Premium Streetwear Hub',
  description: 'Nova Kicks - Nền tảng cung cấp và phân phối các dòng giày Streetwear cao cấp',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}