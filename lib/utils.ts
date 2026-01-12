export const getAssetPath = (path: string) => {
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/asociacion-juegos-mesa' : '';

    if (!path.startsWith('/')) path = '/' + path;

    // Si no hay basePath (desarrollo), devolvemos la ruta tal cual
    if (!basePath) return path;

    // Evitar duplicar el basePath si ya está presente
    if (path.startsWith(basePath)) return path;

    return `${basePath}${path}`;
};
