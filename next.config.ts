import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Enable static optimization where possible
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // Enable webpack optimization in production
  webpack: (config, { dev, isServer }) => {
    // Optimize in production only
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }
    return config;
  },
};

export default nextConfig;
