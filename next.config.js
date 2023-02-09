/** @type {import('next').NextConfig} */

const securityHeaders = require("./headers");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  mode: "production",
});

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  scrollRestoration: true,
  swcMinify: false,
  compiler: {
    removeConsole: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost", "api-community.updevtest.com", "api.updevcommunity.com", "api-com.updevtest.com"],
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
