/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002'
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
  },
  i18n: {
    locales: ['en-US', 'zh-Hans', 'zh-Hant', 'de', 'ru'],
    defaultLocale: 'en-US'
  }
};

module.exports = nextConfig;
