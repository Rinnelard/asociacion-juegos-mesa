export const getAssetPath = (path: string) => {
    const basePath = '/asociacion-juegos-mesa';
    if (!path.startsWith('/')) path = '/' + path;

    // Evitar duplicar el basePath si ya está presente
    if (path.startsWith(basePath)) return path;

    return `${basePath}${path}`;
};
