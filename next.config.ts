import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  // Next.js 15 streams metadata to regular browsers, only guaranteeing head placement
  // for a recognized bot allowlist. This marketing site needs title/description/OG tags
  // reliably in <head> for every visitor and unfurler (Slack, Twitter, iMessage), so
  // treat every request like a bot and disable streaming metadata entirely.
  htmlLimitedBots: /.*/,
};

export default withNextIntl(nextConfig);
