import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Solo aplicamos basePath en producción para evitar el 404 en localhost:3000
  basePath: isProd ? '/asociacion-juegos-mesa' : '',
};

export default nextConfig;
