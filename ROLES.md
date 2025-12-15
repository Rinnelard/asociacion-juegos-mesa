# 🎭 Sistema de Roles y Permisos

## Descripción General

Este documento describe el sistema de roles implementado en la aplicación de la Asociación de Juegos de Mesa.

## 🔐 Roles Disponibles

### 1. Usuario Regular (`user`)
**Permisos:**
- ✅ Ver catálogo de juegos
- ✅ Ver eventos y torneos
- ✅ Ver noticias
- ✅ Enviar mensajes de contacto
- ✅ Ver su propio perfil
- ❌ Acceso al panel de administración
- ❌ Gestionar usuarios
- ❌ Crear/editar/eliminar contenido

**Navegación visible:**
- Inicio
- Catálogo
- Eventos
- Noticias
- Contacto
- Mi Perfil
- Mis Juegos

### 2. Administrador (`admin`)
**Permisos:**
- ✅ Todos los permisos de usuario regular
- ✅ Acceso al panel de administración
- ✅ Gestión de usuarios (crear, editar, eliminar, cambiar roles)
- ✅ Gestión de juegos (añadir, editar, eliminar del catálogo)
- ✅ Gestión de eventos (crear, editar, cancelar eventos)
- ✅ Gestión de noticias (publicar, editar, eliminar)
- ✅ Ver estadísticas y analíticas
- ✅ Configuración del sistema

**Navegación visible:**
- Todas las opciones de usuario regular
- **⚙️ Admin** (enlace destacado en naranja)

## 🔄 Flujo de Autenticación

### Registro de Nuevo Usuario
```
1. Usuario accede a /registro
2. Completa formulario (nombre, email, contraseña)
3. Sistema valida datos
4. Usuario creado con rol "user" por defecto
5. Auto-login y redirección a página principal
```

### Inicio de Sesión
```
1. Usuario accede a /login
2. Introduce email y contraseña
3. Sistema valida credenciales
4. Si es válido: guarda sesión en localStorage
5. Redirección a página principal
6. Navbar se actualiza mostrando opciones según rol
```

### Cierre de Sesión
```
1. Usuario hace click en "Cerrar Sesión"
2. Se elimina sesión de localStorage
3. Se resetea estado de autenticación
4. Navbar vuelve a mostrar "Iniciar Sesión" y "Registrarse"
```

## 🛡️ Protección de Rutas

### Rutas Públicas
- `/` - Inicio
- `/login` - Iniciar sesión
- `/registro` - Registro
- `/juegos` - Catálogo
- `/eventos` - Eventos
- `/noticias` - Noticias
- `/contacto` - Contacto

### Rutas Protegidas (Requiere autenticación)
- `/perfil` - Perfil del usuario
- `/mis-juegos` - Juegos del usuario

### Rutas Protegidas por Rol (Solo Admin)
- `/admin` - Panel de administración
- `/admin/*` - Todas las sub-rutas de admin

**Mecanismo de protección:**
```typescript
useEffect(() => {
  if (!isAuthenticated || user?.role !== 'admin') {
    router.push('/login');
  }
}, [isAuthenticated, user, router]);
```

## 📊 Panel de Administración

El panel de administración (`/admin`) incluye:

### Estadísticas en Tiempo Real
- Total de miembros
- Total de juegos en catálogo
- Eventos próximos
- Valoración promedio

### Secciones de Gestión
1. **👥 Gestión de Usuarios**
   - Lista de todos los usuarios
   - Cambiar roles
   - Activar/desactivar cuentas

2. **🎮 Catálogo de Juegos**
   - Añadir nuevos juegos
   - Editar información
   - Gestionar disponibilidad

3. **📅 Eventos y Torneos**
   - Crear eventos
   - Editar detalles
   - Gestionar inscripciones

4. **📰 Noticias y Anuncios**
   - Publicar noticias
   - Editar contenido
   - Programar publicaciones

5. **📊 Estadísticas**
   - Dashboard de analíticas
   - Exportar datos

6. **⚙️ Configuración**
   - Ajustes del sistema
   - Backups

### Actividad Reciente
Feed en tiempo real de las últimas acciones:
- Nuevos miembros
- Juegos añadidos
- Eventos creados
- Valoraciones recibidas

## 🎨 Indicadores Visuales de Rol

### Badge de Administrador
Los administradores tienen un badge distintivo:
- **Color**: Gradiente naranja (`--gradient-accent`)
- **Texto**: "ADMIN" en mayúsculas
- **Ubicación**: Junto al nombre en el navbar

### Enlace Admin en Navbar
- **Color de fondo**: Gradiente naranja
- **Icono**: ⚙️ (engranaje)
- **Hover**: Elevación con sombra

## 💾 Almacenamiento de Sesión

**Método actual (Demo):**
```typescript
// Guardar sesión
localStorage.setItem('currentUser', JSON.stringify(user));

// Cargar sesión
const storedUser = localStorage.getItem('currentUser');
const user = JSON.parse(storedUser);

// Eliminar sesión
localStorage.removeItem('currentUser');
```

**⚠️ Advertencia de Seguridad:**
Este método es solo para demostración. En producción deberías usar:
- JWT tokens con httpOnly cookies
- Refresh tokens
- Expiración de sesiones
- Backend para validación

## 🔮 Futuras Mejoras

### Roles Adicionales (Propuestas)
1. **Moderador (`moderator`)**
   - Gestión de eventos
   - Gestión de noticias
   - Sin acceso a usuarios ni configuración

2. **Organizador de Eventos (`event_organizer`)**
   - Solo gestión de eventos
   - Sin acceso a otras secciones admin

3. **Editor de Contenido (`content_editor`)**
   - Gestión de noticias
   - Gestión de catálogo de juegos

### Permisos Granulares
```typescript
interface Permission {
  resource: 'users' | 'games' | 'events' | 'news' | 'settings';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

interface Role {
  name: string;
  permissions: Permission[];
}
```

### Auditoría
- Log de acciones administrativas
- Historial de cambios
- Seguimiento de quien modificó qué

## 📝 Implementación Técnica

### AuthContext Structure
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}
```

### Verificación de Rol en Componente
```typescript
import { useAuth } from '@/contexts/AuthContext';

function AdminOnlyComponent() {
  const { user } = useAuth();
  
  if (user?.role !== 'admin') {
    return null; // o mostrar mensaje de acceso denegado
  }
  
  return <AdminContent />;
}
```

### Verificación de Rol en Navbar
```typescript
{user?.role === 'admin' && (
  <Link href="/admin" className={styles.adminLink}>
    <span>⚙️</span> Admin
  </Link>
)}
```

## 🧪 Testing de Roles

### Casos de Prueba
1. ✅ Usuario no autenticado no puede acceder a /admin
2. ✅ Usuario regular no puede acceder a /admin
3. ✅ Administrador puede acceder a /admin
4. ✅ Enlace "Admin" solo visible para administradores
5. ✅ Badge "Admin" solo visible para administradores
6. ✅ Sesión persiste al recargar la página
7. ✅ Logout limpia correctamente la sesión

---

**Última actualización**: Diciembre 2025
