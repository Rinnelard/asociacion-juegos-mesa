import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Necesario si tu repositorio no es tuUsuario.github.io
  // Descomenta y cambia 'nombre-repo' por el nombre de tu repositorio
  // basePath: '/nombre-repo',
};

export default nextConfig;
