// @ts-check

const withNextIntl = require("next-intl/plugin")("./src/lib/i18n.ts");

/**
 * @type {import('next').NextConfig}
 */

const nextConfig /** @type {import('next').NextConfig} */ = {
  async redirects() {
    return [
      {
        source: "/",
        permanent: false,
        destination: "/main",
      },
      {
        source: "/en",
        permanent: false,
        destination: "/en/main",
      },
      {
        source: "/zh",
        permanent: false,
        destination: "/zh/main",
      },
    ];
  },
};

// @ts-ignore
module.exports = withNextIntl(nextConfig);
