import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@store/ui', '@store/database', '@store/utils'],
};

export default nextConfig;
