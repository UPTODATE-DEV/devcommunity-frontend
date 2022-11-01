/** @type {import('next').NextConfig} */

const securityHeaders = require("./headers");

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "api-community.updevtest.com"],
    formats: ["image/avif", "image/webp"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
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

module.exports = nextConfig;
