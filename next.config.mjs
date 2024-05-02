/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
      {
        hostname: "*",
      },
      {
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
