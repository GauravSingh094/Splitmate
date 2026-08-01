import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  // ---- React ---------------------------------------------------
  reactStrictMode: true,

  // ---- Performance ---------------------------------------------
  compress: true,

  // ---- Images --------------------------------------------------
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // ---- Logging -------------------------------------------------
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // ---- Proxy API Rewrites (Eliminates Browser CORS Errors) -------
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://apiv1.splitmate.page/api/v1/:path*',
      },
    ];
  },

  // ---- Headers -------------------------------------------------
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // ---- TypeScript & ESLint ------------------------------------
  typescript: {
    ignoreBuildErrors: false,
  },

  // ---- Turbopack ----------------------------------------------
  turbopack: {},
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(withSerwist(nextConfig));
