/** @type {import('next').NextConfig} */

const securityHeaders = require("./headers");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  mode: "production",
});

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    scrollRestoration: true,
  },
  swcMinify: false,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost", "api.updevcommunity.com", "admin.updevcommunity.com", "api-test.updevcommunity.com"],
    minimumCacheTTL: 60,
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
    localeDetection: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withPWA({
  ...nextConfig,
});
