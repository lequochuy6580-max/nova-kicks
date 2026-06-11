/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Cho phép load ảnh từ các domain bên ngoài
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myshoes.vn',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
