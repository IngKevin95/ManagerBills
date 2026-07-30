## Trazabilidad
- **Épica**: EP-001 (Autenticación y Perfiles)

## Why
El proyecto necesita una base funcional para soportar múltiples perfiles de usuario y preferencias, almacenado localmente. Esto permite que distintos usuarios usen la app en el mismo dispositivo manteniendo sus finanzas separadas.

## What Changes
- Inicialización del proyecto web con React (Vite) para usar en Web/Escritorio.
- Integración de base de datos local SQLite (`sqlocal` o Web SQL compatible) o backend local (Node/Electron). (Para efectos de esta épica inicial, un stack Vite+React+sqlocal (OPFS) permite cumplir con el motor local relacional SQLite offline sin saltar a Electron prematuramente).
- Creación de flujo de Autenticación Local y perfiles.
- Soporte para Tema Claro y Oscuro guardado en las preferencias del usuario.

## Capabilities

### New Capabilities
- `auth-local`: Autenticación local y gestión de usuarios (Admin, Editor, Lector).
- `theme-switcher`: Cambio de modo Claro/Oscuro por usuario.
- `db-local`: Configuración e inicialización de SQLite en entorno local.

### Modified Capabilities

## Impact
- Migración del prototipo inicial (HTML/JS) a un entorno real basado en React.
- Introducción de persistencia relacional local.
