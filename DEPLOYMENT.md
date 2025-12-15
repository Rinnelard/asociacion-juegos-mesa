# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar tu aplicación de la Asociación de Juegos de Mesa en GitHub Pages de forma gratuita.

## 📋 Requisitos Previos

- Tener una cuenta en GitHub
- Tener Git instalado en tu computadora
- El proyecto ya está configurado para exportación estática

## 🔧 Pasos para Desplegar

### 1. Crear un Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y haz login
2. Click en el botón `+` en la esquina superior derecha
3. Selecciona `New repository`
4. Nombra tu repositorio (por ejemplo: `asociacion-juegos-mesa`)
5. Puedes dejarlo **público** o **privado**
6. **NO** inicialices con README (ya tienes uno)
7. Click en `Create repository`

### 2. Configurar el Repositorio Localmente

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializa git (si no está inicializado)
git init

# Añade todos los archivos
git add .

# Hace el primer commit
git commit -m "Initial commit - Asociación de Juegos de Mesa"

# Conecta con tu repositorio de GitHub
# Reemplaza 'TU-USUARIO' y 'NOMBRE-REPO' con tus datos
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git

# Sube el código
git branch -M main
git push -u origin main
```

### 3. Configurar basePath (Solo si NO usas username.github.io)

Si tu repositorio NO es `tuUsuario.github.io`, necesitas configurar el basePath:

1. Abre el archivo `next.config.ts`
2. Descomenta las líneas del `basePath`
3. Cambia `'nombre-repo'` por el nombre de tu repositorio
4. Guarda el archivo

Ejemplo:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/asociacion-juegos-mesa', // 👈 Tu repositorio
};
```

Luego:
```bash
git add next.config.ts
git commit -m "Configure basePath for GitHub Pages"
git push
```

### 4. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en `Settings` (Configuración)
3. En el menú lateral, busca `Pages`
4. En `Source`, selecciona `GitHub Actions`
5. ¡Listo! El workflow se ejecutará automáticamente

### 5. Esperar el Despliegue

1. Ve a la pestaña `Actions` de tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (unos 2-3 minutos)
4. Una vez completado, verás un ✅ verde

### 6. Acceder a tu Sitio

Tu sitio estará disponible en:

**Si el repo se llama `tuUsuario.github.io`:**
```
https://tuUsuario.github.io
```

**Si el repo tiene otro nombre:**
```
https://tuUsuario.github.io/nombre-repo
```

## 🔄 Actualizar el Sitio

Cada vez que quieras actualizar tu sitio:

```bash
# Haz tus cambios en el código

# Añade los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "Descripción de tus cambios"

# Sube a GitHub
git push
```

El sitio se actualizará automáticamente en unos minutos.

## 🐛 Solución de Problemas

### Error 404 al cargar el sitio

- **Causa**: basePath no configurado correctamente
- **Solución**: Asegúrate de que el `basePath` en `next.config.ts` coincida exactamente con el nombre de tu repositorio

### Las imágenes no cargan

- **Causa**: Rutas absolutas en las imágenes
- **Solución**: Todas las imágenes usan rutas relativas, pero verifica que las URLs en la base de datos no usen rutas absolutas

### El workflow falla

- **Causa**: Dependencias no instaladas o error en el build
- **Solución**: 
  1. Ve a la pestaña `Actions`
  2. Click en el workflow fallido
  3. Revisa los logs para ver el error específico
  4. Corrige el error en local
  5. Haz commit y push de nuevo

### localStorage no funciona

- **Causa**: Configuración de privacidad del navegador
- **Solución**: localStorage funciona normalmente en GitHub Pages, pero algunos navegadores pueden bloquearlo en modo incógnito

## 📱 Probar Localmente la Build de Producción

Antes de desplegar, puedes probar cómo se verá en producción:

```bash
# Genera la build estática
npm run build

# Sirve localmente (necesitas http-server)
npx serve@latest out
```

Luego abre http://localhost:3000 para ver la versión de producción.

## 🎯 URLs de Ejemplo

Suponiendo que tu usuario es `angelsuarez` y tu repo es `asociacion-juegos-mesa`:

- **Repositorio**: https://github.com/angelsuarez/asociacion-juegos-mesa
- **Sitio Web**: https://angelsuarez.github.io/asociacion-juegos-mesa
- **Actions**: https://github.com/angelsuarez/asociacion-juegos-mesa/actions

## ✨ Consejos Adicionales

1. **Dominio Personalizado**: Puedes configurar un dominio propio en Settings > Pages > Custom domain
2. **HTTPS**: GitHub Pages tiene HTTPS activado por defecto
3. **Ramas**: Puedes usar diferentes ramas para staging y producción
4. **Commits**: Usa mensajes descriptivos: `feat: nueva funcionalidad`, `fix: corregir bug`, etc.

## 📚 Recursos

- [Documentación de GitHub Pages](https://docs.github.com/es/pages)
- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [GitHub Actions](https://docs.github.com/es/actions)

---

**¡Tu sitio estará en línea y accesible desde cualquier lugar del mundo! 🌍**
