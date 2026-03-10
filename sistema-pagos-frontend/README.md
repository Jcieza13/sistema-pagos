# 📚 Sistema de Pagos – Frontend (Angular 17)

Aplicación **Angular 17 standalone** para la gestión de estudiantes y pagos, con soporte multi-rol (**ADMIN**, **USER/ESTUDIANTE**) y autenticación básica.  
Incluye vistas administrativas, panel de usuario, registro de pagos, perfil, navegación dinámica y documentación completa.

---

## 🚀 Tecnologías utilizadas
- **Angular 17** (standalone components, router, HttpClient)
- **Angular Material** (UI/UX moderna y responsiva)
- **RxJS** (gestión de estado de sesión con `BehaviorSubject`)
- **TypeScript**
- **HTML5 / CSS3**
- **LocalStorage** (persistencia de sesión)

---

## 🏗️ Arquitectura del proyecto

### 📂 Estructura principal
- `app/`
  - `services/` → servicios (`AuthService`, `EstudiantesService`, `PagosService`)
  - `models/` → modelos (`Estudiante`, `Pago`)
  - `shared/` → componentes compartidos (`Navbar`, `Footer`)
  - `user/` → vistas para estudiantes (`UserDashboard`, `UserPagos`, `NewPago`)
  - `admin/` → vistas para administradores (`AdminPagos`, `AdminNewPago`, `Estudiantes`, etc.)
  - `profile/` → perfil de usuario autenticado
  - `guards/` → seguridad (`authGuard`, `authorizationGuard`)
  - `app.component.*` → componente raíz
- `environments/` → configuración de entorno (`environment.ts`)
- Archivos raíz: `index.html`, `main.ts`

---

## 🔐 Autenticación y Roles
- **AuthService** gestiona login/logout, roles y código de estudiante.
- Roles disponibles:
  - `ADMIN` → acceso a gestión de estudiantes y pagos.
  - `USER/ESTUDIANTE` → acceso a panel personal y registro de pagos.
- Persistencia de sesión en `localStorage`.
- Guards:
  - `authGuard` → protege rutas si no hay sesión activa.
  - `authorizationGuard` → restringe acceso según rol.

---

## 📌 Componentes principales

### 🔧 Compartidos
- **NavbarComponent** → navegación dinámica según rol, incluye logout.
- **FooterComponent** → pie de página fijo con estilo corporativo.

### 👤 Usuario (Estudiante)
- **UserDashboardComponent** → panel con deuda pendiente y últimos pagos.
- **UserPagosComponent** → listado completo de pagos del estudiante.
- **NewPagoComponent** → formulario para registrar pagos con comprobante PDF.

### 🛠️ Administrador
- **AdminPagosComponent** → listado de pagos con acciones de aprobar/rechazar.
- **AdminNewPagoComponent** → registro de nuevos pagos desde administración.
- **EstudiantesComponent** → listado y gestión de estudiantes.
- **EstudianteDetailsComponent** → detalle de estudiante con pagos asociados.
- **NewEstudianteComponent** → formulario para registrar estudiantes.

### 👤 Perfil
- **ProfileComponent** → muestra datos del usuario autenticado (username, roles, código de estudiante).

### 🏠 Home
- **HomeComponent** → página de bienvenida.

---

## 🔧 Servicios
- **AuthService** → login/logout, roles, sesión, rutas iniciales.
- **EstudiantesService** → CRUD de estudiantes.
- **PagosService** → CRUD de pagos (crear, listar, actualizar estado, obtener por estudiante).

---

## ⚙️ Configuración
- **environment.ts** → define `backendHost` (`http://localhost:8080`).
- **main.ts** → arranque de la aplicación con `bootstrapApplication`, router y Angular Material.
- **index.html** → documento raíz con tipografía Roboto y Material Icons.

---

## 🎨 UI/UX
- Basada en **Angular Material**.
- Estilos consistentes con colores corporativos (`#1976d2` azul primario).
- Layout responsivo con `Navbar` y `Footer` fijos.
- Feedback al usuario mediante `MatSnackBar` (mensajes de éxito/error).

---

## 🗺️ Rutas principales

La aplicación define rutas protegidas y dinámicas según el rol del usuario:

### 🔑 Autenticación
- `/login` → pantalla de inicio de sesión.
- `/profile` → perfil del usuario autenticado.

### 🏠 Home
- `/home` → página de bienvenida.

### 👤 Usuario (Estudiante)
- `/user/dashboard` → panel principal con deuda pendiente y últimos pagos.
- `/user/pagos` → listado completo de pagos del estudiante.
- `/user/new-pago` → formulario para registrar un nuevo pago.

### 🛠️ Administrador
- `/admin/estudiantes` → gestión de estudiantes.
- `/admin/estudiantes/:codigo` → detalle de estudiante con pagos asociados.
- `/admin/new-estudiante` → formulario para registrar un nuevo estudiante.
- `/admin/pagos` → listado de pagos con acciones de aprobar/rechazar.
- `/admin/new-pago` → formulario para registrar un nuevo pago.

### 🚫 Seguridad
- `/unauthorized` → vista mostrada cuando un usuario intenta acceder a una ruta sin permisos.

🔐 **Nota:**  
- Todas las rutas están protegidas por `authGuard` (requiere sesión activa).  
- Las rutas de administrador están protegidas adicionalmente por `authorizationGuard` (requiere rol `ADMIN`).  

---

## ▶️ Ejecución
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# Acceder en navegador
http://localhost:4200


