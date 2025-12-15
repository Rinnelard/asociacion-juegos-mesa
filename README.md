# 🎲 Asociación de Juegos de Mesa - FUNCIONAL COMPLETO

Una aplicación web moderna y **completamente funcional** para gestionar una asociación de juegos de mesa con autenticación, reservas, eventos, valoraciones y panel de administración.

## ✨ Características IMPLEMENTADAS

### 🔐 Sistema de Autenticación
- ✅ Login y registro de usuarios
- ✅ Sesión persistente con localStorage
- ✅ Roles de usuario (user/admin)
- ✅ Protección de rutas por roles

### 🎮 Catálogo de Juegos (FUNCIONAL)
- ✅ **Búsqueda en tiempo real** por nombre y descripción
- ✅ **Filtros múltiples**: categoría, dificultad, disponibilidad
- ✅ **Sistema de reservas**: reservar y devolver juegos
- ✅ **Valoraciones con estrellas** (1-5) y comentarios
- ✅ **Media de puntuaciones** calculada automáticamente
- ✅ **Historial de valoraciones** de otros usuarios
- ✅ Tarjetas animadas con efectos hover

### 📅 Eventos y Actividades (FUNCIONAL)
- ✅ **Inscripción/Desinscripción** a eventos
- ✅ **Control de capacidad** con visualización en tiempo real
- ✅ **Filtros**: próximos, todos, mis inscripciones
- ✅ **Tipos de eventos**: Torneo, Taller, Meetup, Especial
- ✅ **Barra de progreso** de plazas ocupadas
- ✅ Eventos pasados marcados automáticamente

### 👤 Perfil de Usuario (FUNCIONAL)
- ✅ **Edición de datos personales**: nombre, teléfono
- ✅ **Cambio de contraseña** con confirmación
- ✅ **Estadísticas personales**: juegos reservados, eventos inscritos, días como miembro
- ✅ **Vista de juegos reservados** con opción de devolución
- ✅ **Vista de eventos inscritos** con detalles
- ✅ Avatar con iniciales del usuario

### ⚙️ Panel de Administración (FUNCIONAL)
- ✅ **CRUD completo de Juegos**: crear, editar, eliminar
- ✅ **CRUD completo de Eventos**: gestión total de eventos
- ✅ **CRUD completo de Noticias**: publicar y administrar noticias
- ✅ **Dashboard con estadísticas en tiempo real**:
  - Total de juegos y disponibilidad
  - Eventos y próximos eventos
  - Total de inscripciones
  - Usuarios registrados
- ✅ **Interfaz con tabs** para navegación fluida
- ✅ **Modales elegantes** para formularios
- ✅ **Validación de datos** en tiempo real

### 🔔 Sistema de Notificaciones
- ✅ **Toast notifications** profesionales
- ✅ **4 tipos**: Success, Error, Warning, Info
- ✅ **Auto-dismiss** después de 4 segundos
- ✅ **Animaciones suaves** de entrada/salida

### 💾 Base de Datos Simulada
- ✅ Sistema completo usando **localStorage**
- ✅ **Relaciones entre entidades** (usuarios ↔ juegos, usuarios ↔ eventos)
- ✅ **Datos iniciales** precargados
- ✅ **Persistencia automática** de todos los cambios
- ✅ **API interna** con métodos completos (getAll, getById, create, update, delete)

### 🎨 Diseño Premium
- ✅ **Dark theme** moderno con gradientes vibrantes
- ✅ **Animaciones** y transiciones suaves
- ✅ **Efectos glassmorphism** y hover
- ✅ **100% Responsive** (móvil, tablet, desktop)
- ✅ **Tipografía Google Fonts** (Inter + Bebas Neue)
- ✅ **Sistema de colores HSL** personalizable

## 🚀 Cómo Ejecutar

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción
```bash
npm run build
npm start
```

## 👥 Credenciales de Prueba

### 👑 Administrador
- **Email**: `admin@juegosdemesa.com`
- **Contraseña**: `admin123`
- **Acceso**: Panel admin completo + todas las funciones

### 🎮 Usuario Regular
- **Email**: `usuario@juegosdemesa.com`
- **Contraseña**: `user123`
- **Acceso**: Reservas, eventos, perfil

## 📋 Guía de Uso

### Para Usuarios

1. **Registrarse o Iniciar Sesión**
   - Crear cuenta nueva o usar credenciales de prueba
   
2. **Explorar Juegos**
   - Buscar por nombre
   - Filtrar por categoría, dificultad o disponibilidad
   - Ver valoraciones de otros usuarios
   
3. **Reservar Juegos**
   - Click en "Reservar" en cualquier juego disponible
   - Ver tus reservas en tu perfil
   - Devolver cuando termines de jugar
   
4. **Valorar Juegos**
   - Click en "⭐ Valorar"
   - Selecciona estrellas (1-5)
   - Añade comentario opcional
   - Tu valoración aparecerá públicamente
   
5. **Inscribirse en Eventos**
   - Navegar a Eventos
   - Ver plazas disponibles
   - Click en "Inscribirse ahora"
   - Cancelar inscripción si cambias de opinión
   
6. **Gestionar Perfil**
   - Click en tu nombre en el navbar
   - Seleccionar "Mi Perfil"
   - Editar información personal
   - Cambiar contraseña
   - Ver estadísticas y actividad

### Para Administradores

1. **Acceder al Panel Admin**
   - Iniciar sesión como admin
   - Click en "⚙️ Admin" en el navbar
   
2. **Gestionar Juegos**
   - Tab "🎮 Juegos"
   - Click "+ Nuevo Juego" para añadir
   - Click "✏️" para editar existentes
   - Click "🗑️" para eliminar
   - Completar formulario con datos del juego
   
3. **Gestionar Eventos**
   - Tab "📅 Eventos"
   - Crear eventos con fecha, hora, lugar
   - Definir capacidad máxima
   - Seleccionar tipo (Torneo, Taller, etc.)
   - Editar o eliminar eventos existentes
   
4. **Publicar Noticias**
   - Tab "📰 Noticias"
   - Click "+ Nueva Noticia"
   - Escribir título, extracto y contenido
   - Añadir imagen y categoría
   - Publicar instantáneamente
   
5. **Ver Estadísticas**
   - Tab "📊 Estadísticas"
   - Dashboard completo con métricas:
     - Juegos totales y disponibles
     - Eventos y participación
     - Usuarios registrados
     - Noticias publicadas

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules
- **Estado**: React Context API
- **Almacenamiento**: localStorage (simulando backend)
- **Notificaciones**: Toast context custom

## 📁 Estructura de Archivos

```
asociacion-juegos/
├── app/
│   ├── admin/              # Panel de administración
│   │   ├── page.tsx        # CRUD completo
│   │   └── admin.module.css
│   ├── eventos/            # Página de eventos
│   │   ├── page.tsx        # Inscripciones funcionales
│   │   └── eventos.module.css
│   ├── juegos/             # Catálogo de juegos
│   │   ├── page.tsx        # Reservas y valoraciones
│   │   └── juegos.module.css
│   ├── perfil/             # Perfil de usuario
│   │   ├── page.tsx        # Edición de datos
│   │   └── perfil.module.css
│   ├── login/              # Autenticación
│   ├── registro/           # Registro de usuarios
│   ├── noticias/           # Blog de noticias
│   ├── contacto/           # Formulario de contacto
│   ├── globals.css         # Sistema de diseño
│   ├── layout.tsx          # Layout con providers
│   └── page.tsx            # Página de inicio
├── components/
│   └── Navbar.tsx          # Navegación con menú usuario
├── contexts/
│   ├── AuthContext.tsx     # Gestión de autenticación
│   └── ToastContext.tsx    # Sistema de notificaciones
├── lib/
│   └── db.ts               # Base de datos simulada
└── public/                 # Imágenes y assets
```

## 🔥 Funcionalidades Destacadas

### Sistema de Reservas
- **Solo usuarios autenticados** pueden reservar
- **Control de disponibilidad** en tiempo real
- **Un juego, un usuario** a la vez
- **Devolución fácil** desde el perfil
- **Estado visual** del juego (disponible/reservado)

### Sistema de Valoraciones
- **Estrellas de 1-5** con selector visual
- **Comentarios opcionales** de texto libre
- **Una valoración por usuario por juego**
- **Posibilidad de editar** valoración existente
- **Cálculo automático** de media de puntuaciones

### Sistema de Eventos
- **Capacidad limitada** con control en tiempo real
- **Barra de progreso visual** de plazas
- **Colores dinámicos** según ocupación
- **Prevención de sobre-inscripción**
- **Filtrado inteligente** por estado

### Panel Admin Completo
- **Sin necesidad de base de datos externa**
- **Cambios instantáneos** en la UI
- **Formularios con validación**
- **Confirmación antes de eliminar**
- **Estadísticas actualizadas** en tiempo real

## 🎨 Personalización

### Cambiar Colores
Edita `app/globals.css`:
```css
--primary-hue: 260;  /* Púrpura principal */
--accent-hue: 30;    /* Naranja acento */
```

### Datos Iniciales
Modifica `lib/db.ts` para ajustar:
- Juegos precargados
- Eventos de ejemplo
- Noticias iniciales
- Usuarios de prueba

## 🚀 Próximos Pasos (Opcionales)

Para llevar a producción:

1. **Backend Real**
   - API REST o GraphQL
   - Base de datos (PostgreSQL/MongoDB)
   - JWT para autenticación
   
2. **Uploads de Imágenes**
   - Cloudinary o AWS S3
   - Compresión automática
   
3. **Emails**
   - Confirmación de registro
   - Recordatorios de eventos
   - Notificaciones de reservas

4. **Pagos**
   - Stripe para membresías
   - Cuotas de eventos especiales

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.

---

**🎲 ¡Disfruta gestionando tu comunidad de juegos de mesa!**

**Desarrollado con ❤️ usando Next.js y TypeScript**
