/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins:["192.168.31.104"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
