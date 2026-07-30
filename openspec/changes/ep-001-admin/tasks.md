# Tasks: EP-001 Admin & Navigation Extension

- [x] Instalar `react-router-dom`.
- [x] Actualizar `db/index.js` agregando `getAllUsers()` y `createUser(name, role)`.
- [x] Actualizar `AuthContext.jsx` añadiendo la función `logout()`.
- [x] Crear componente `Layout.jsx` con navegación (links a Inicio y Usuarios) y botón de perfil.
- [x] Crear componente `UsersView.jsx` (solo accesible por Administradores) con lista y creación de perfiles.
- [x] Refactorizar `App.jsx` e `index.js/main.jsx` para integrar `BrowserRouter`, `<Routes>`, `<Route>` y redirecciones de seguridad.
- [x] Verificar ruteo de Lector (debe rebotar si intenta ir a `/users`).
- [x] Validar visualmente con `npm run build` o `npm run dev`.
