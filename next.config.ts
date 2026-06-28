import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  webpack: (config) => {
    config.node = { __dirname: true, __filename: true };
    return config;
  },
};

export default withNextIntl(nextConfig);
