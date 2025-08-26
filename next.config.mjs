/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  webpack: (config, { isServer, dev }) => {
    // CSS最適化（本番環境のみ）
    if (!isServer && !dev && config.optimization.splitChunks) {
      // splitChunksが有効な場合のみcacheGroupsを設定
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.(css|scss|sass)$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
