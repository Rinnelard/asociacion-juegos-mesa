# 🎲 Asociación de Juegos de Mesa

Una aplicación web moderna para gestionar una asociación de juegos de mesa con sistema de autenticación y roles de usuario.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Sistema de Autenticación Completo**
  - Login de usuarios
  - Registro de nuevos miembros
  - Sesión persistente (localStorage)
  
- **Control de Acceso Basado en Roles**
  - **Usuario Regular**: Acceso a catálogo, eventos y noticias
  - **Administrador**: Acceso completo incluyendo panel de administración

- **Páginas Implementadas**
  - 🏠 **Inicio**: Página principal con hero section animado
  - 🎮 **Catálogo de Juegos**: Listado de juegos disponibles
  - 📅 **Eventos**: Torneos y actividades programadas
  - 📰 **Noticias**: Anuncios y novedades
  - 📧 **Contacto**: Formulario de contacto
  - ⚙️ **Panel Admin** (Solo administradores): Dashboard con estadísticas y gestión

### 🎨 Diseño
- Dark theme moderno y atractivo
- Animaciones suaves y micro-interacciones
- Diseño responsive (móvil, tablet, desktop)
- Tipografía personalizada (Inter + Bebas Neue)
- Sistema de colores con gradientes vibrantes
- Efectos glassmorphism

## 🔐 Credenciales de Prueba

Para probar la aplicación, usa las siguientes credenciales:

### Administrador
- **Email**: `admin@juegosdemesa.com`
- **Contraseña**: `admin123`
- **Acceso**: Panel de administración + todas las funciones

### Usuario Regular
- **Email**: `usuario@juegosdemesa.com`
- **Contraseña**: `user123`
- **Acceso**: Funciones de usuario estándar

## 🛠️ Instalación y Uso

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn

### Pasos para Ejecutar

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

4. **Build para producción**:
   ```bash
   npm run build
   npm start
   ```

## 📁 Estructura del Proyecto

```
asociacion-juegos/
├── app/                      # Páginas y rutas de Next.js
│   ├── admin/               # Panel de administración (protegido)
│   ├── eventos/             # Página de eventos
│   ├── juegos/              # Catálogo de juegos
│   ├── login/               # Página de login
│   ├── noticias/            # Página de noticias
│   ├── registro/            # Página de registro
│   ├── contacto/            # Página de contacto
│   ├── globals.css          # Estilos globales y sistema de diseño
│   ├── layout.tsx           # Layout principal con providers
│   └── page.tsx             # Página de inicio
├── components/              # Componentes reutilizables
│   └── Navbar.tsx          # Barra de navegación
├── contexts/                # Contextos de React
│   └── AuthContext.tsx     # Context de autenticación y roles
└── public/                  # Archivos estáticos
```

## 🔑 Sistema de Autenticación

### AuthContext
El contexto de autenticación (`contexts/AuthContext.tsx`) maneja:
- Estado de autenticación del usuario
- Roles de usuario (user/admin)
- Funciones de login/logout/registro
- Persistencia de sesión en localStorage

### Protección de Rutas
- La página `/admin` verifica automáticamente el rol del usuario
- Redirige a `/login` si el usuario no está autenticado o no es admin
- El navbar muestra/oculta opciones según el estado de autenticación y rol

## 🎯 Próximos Pasos (Sugerencias)

Para llevar esta aplicación a producción, considera:

1. **Backend Real**
   - Implementar API con Node.js/Express o similar
   - Base de datos (MongoDB, PostgreSQL, MySQL)
   - JWT o sesiones seguras para autenticación
   - Hash de contraseñas con bcrypt

2. **Funcionalidades Adicionales**
   - CRUD completo para juegos, eventos y noticias
   - Sistema de reservas de juegos
   - Inscripción a eventos con límite de participantes
   - Perfil de usuario editable
   - Sistema de valoraciones y comentarios
   - Chat o foro de la comunidad

3. **Mejoras de Seguridad**
   - Validación de formularios con bibliotecas como Zod
   - Protección CSRF
   - Rate limiting
   - Sanitización de inputs

4. **Optimizaciones**
   - Caché de imágenes
   - Lazy loading de componentes
   - Optimización SEO
   - Analytics

## 🛡️ Tecnologías Utilizadas

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules
- **Autenticación**: Context API (demo)
- **Fuentes**: Google Fonts (Inter, Bebas Neue)

## 📝 Notas de Desarrollo

- **Datos Demo**: Los usuarios y datos actuales son solo para demostración
- **LocalStorage**: La sesión se guarda en localStorage (no seguro para producción)
- **Sin Backend**: Esta es una aplicación frontend-only. Para producción necesitarás un backend real

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `app/globals.css`:
```css
--primary-hue: 260;  /* Color principal */
--accent-hue: 30;    /* Color de acento */
```

### Modificar Fuentes
Cambia las importaciones en `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@...');
```

## 📞 Soporte

Si tienes preguntas o necesitas ayuda con la aplicación, no dudes en contactar.

---

**¡Hecho con ❤️ para la comunidad de jugadores de mesa!** 🎲
