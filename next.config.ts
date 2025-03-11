import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
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
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);