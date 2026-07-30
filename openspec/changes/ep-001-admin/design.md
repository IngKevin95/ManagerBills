# Design: EP-001 Admin & Navigation Extension

## Architecture
- **Routing**: Usaremos `react-router-dom` (v6+). El punto de entrada `App.jsx` definirá las rutas.
- **Layout Pattern**: Rutas autenticadas estarán envueltas por un `<Layout />` que provee el menú de navegación constante.
- **State**: `AuthContext` se expandirá con una función `logout()`.
- **Database (sqlocal)**: 
  - `getAllUsers()`: Retorna ID, nombre y rol.
  - `createUser(name, role)`: Ejecuta un INSERT manejando restricción UNIQUE del nombre.

## Components
- `Layout.jsx`: Navbar superior con ícono de menú, título de la pantalla actual, y botón de perfil (dropdown con "Cerrar sesión" y toggle de Tema).
- `DashboardView.jsx`: Se limpia de funciones genéricas de perfil (que ahora van al Layout).
- `UsersView.jsx`: Tabla/Lista de usuarios existentes. Formulario inline o en modal para crear un nuevo usuario. Protegido por validación de rol 'Admin' en el render o en el Router.
