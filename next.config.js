/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  images: {
    domains: ['c8.alamy.com', 'lh3.googleusercontent.com']
  }
};

module.exports = nextConfig;
