import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'headlesswp.galaxyweblinks.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              // Base protections
              "default-src 'self'",
              
              // Images
              "img-src 'self' data: blob: https://headlesswp.galaxyweblinks.com",
              
              // Scripts (preserve existing allowances)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://apis.google.com https://www.google.com https://www.gstatic.com; frame-src https://www.google.com https://www.gstatic.com;",
              
              // Styles (preserve existing allowances)
              "style-src 'self' 'unsafe-inline' https://nextjs-demo.galaxyweblinks.com https://fonts.googleapis.com",
              "style-src-elem 'self' 'unsafe-inline' https://nextjs-demo.galaxyweblinks.com https://fonts.googleapis.com",
              
              // Fonts
              "font-src 'self' data: https://fonts.googleapis.com",
              
              // Connects (for API calls if needed)
              "connect-src 'self' https://headlesswp.galaxyweblinks.com/graphql"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;