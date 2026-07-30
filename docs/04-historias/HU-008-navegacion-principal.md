---
id: HU-008
titulo: Navegación y Menú de Perfil
epica: EP-001
prioridad: Alta
complejidad: Baja
estado: lista
---

# HU-008: Navegación y Menú de Perfil

**Como** usuario autenticado en la aplicación
**Quiero** tener un menú de navegación global (lateral o superior) y un menú de perfil desplegable
**Para** poder cambiar fácilmente entre el Dashboard, la Configuración de la cuenta, la Gestión de Usuarios (si soy Admin) y poder cerrar sesión de forma ordenada.

## Check INVEST (Completado)
- [x] (I) Independiente: Solo depende de que el router (React Router) esté instalado; no bloquea ni es bloqueada por ningún módulo de datos.
- [x] (N) Negociable: La UI del menú (lateral, superior, hamburguesa) es flexible según el tiempo de sprint.
- [x] (V) Valiosa: Facilita el uso y descubrimiento de funcionalidades.
- [x] (E) Estimable: Un componente de Layout + router links es predecible (~1 punto).
- [x] (S) Small: Layout general y React Router links.
- [x] (T) Testeable: Los clics llevan a pantallas correctas según permisos.

## Criterios de Aceptación (Acceptance Criteria)

**Scenario 1: Navegación entre vistas (Happy Path)**
- **Given** que el estado del sistema registra una sesión activa
- **When** hago clic en las opciones del menú lateral o superior (ej. "Dashboard" o "Usuarios")
- **Then** la interfaz renderiza el componente correspondiente a la ruta de forma instantánea sin recargar la ventana del navegador.

**Scenario 2: Cierre de sesión completo (Happy Path)**
- **Given** que estoy navegando en la aplicación autenticado
- **When** despliego mi menú de perfil y hago clic en "Cerrar sesión" (Logout)
- **Then** mi estado de sesión global se limpia
- **And** soy redirigido a la pantalla inicial de Login/Selección de perfil.

**Scenario 3: Redirección de rutas inválidas (Edge Case)**
- **Given** que el sistema tiene el enrutador inicializado
- **When** ingreso manualmente una ruta que no existe (ej. `/configuracion-fantasma`) en la barra de direcciones
- **Then** el sistema intercepta la petición
- **And** muestra una pantalla 404 amistosa o me redirige al Dashboard por defecto.
