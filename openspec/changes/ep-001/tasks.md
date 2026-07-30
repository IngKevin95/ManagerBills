## 1. Environment Setup

- [x] 1.1 Configurar proyecto Vite con React (migrando el HTML actual a componentes React si es necesario, o inicializando desde cero en una subcarpeta/raíz).
- [x] 1.2 Instalar dependencias necesarias (`sqlocal` o `sqlite-wasm`, Tailwind/CSS puro, etc).
- [x] 1.3 Configurar estructura base de carpetas (`components`, `context`, `db`, `views`).

## 2. Local Database Setup

- [x] 2.1 Configurar el cliente de base de datos (`db/index.js` o similar) para inicializar SQLite OPFS.
- [x] 2.2 Crear migraciones iniciales o script de inicialización (`CREATE TABLE IF NOT EXISTS users ...`, `preferences`).
- [x] 2.3 Proveer hooks o servicios para ejecutar consultas (ej: `getUsers()`, `createUser()`).

## 3. Auth Flow

- [x] 3.1 Implementar pantalla/componente de bienvenida y verificación de base de datos vacía.
- [x] 3.2 Implementar flujo para crear el primer usuario ("Admin").
- [x] 3.3 Implementar pantalla de selección de perfiles para usuarios existentes.
- [x] 3.4 Crear contexto global (`AuthContext`) para almacenar el perfil activo.

## 4. Theme Provider

- [x] 4.1 Crear un `ThemeContext` que lea la preferencia de la base de datos o use default (claro).
- [x] 4.2 Implementar componente `ThemeToggle` (botón Claro/Oscuro).
- [x] 4.3 Al cambiar, guardar la preferencia de tema en SQLite para el usuario activo.
- [x] 4.4 Aplicar clases o variables CSS dinámicas a nivel raíz.
