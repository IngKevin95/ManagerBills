## Context
El proyecto se encuentra en una fase inicial donde actualmente consiste únicamente en archivos HTML, JS y CSS. Según el PRD, es necesario migrar a un entorno React universal, utilizando SQLite como base de datos local para almacenar perfiles de usuario, temas y transacciones, funcionando de manera local y offline.

## Goals / Non-Goals

**Goals:**
- Configurar un entorno Vite + React funcional.
- Integrar una solución SQLite para la web (OPFS / sql.js / sqlocal).
- Construir el sistema de perfiles (creación y login simulado).
- Soportar el modo claro y oscuro persistente.

**Non-Goals:**
- Configurar base de datos en nube o sincronización remota.
- Crear empaquetados nativos (Electron o React Native) en esta fase (solo se configurará el entorno web listo para ser empaquetado posteriormente).
- Desarrollar la parte de transacciones (esto pertenece a EP-002).

## Decisions
1. **Framework:** Vite + React + TypeScript/JS. Razón: Rápido, ligero y fácil de portar a Electron después.
2. **Base de Datos:** `sqlocal` (o equivalente basado en WASM y OPFS). Razón: Permite ejecutar SQLite directamente en el navegador de manera persistente, cumpliendo con el requisito del PRD de usar SQLite offline y sin necesidad de montar un backend Node.
3. **Gestión de Estado y Temas:** Context API de React. Razón: Simple para el volumen actual (usuario activo y preferencia de tema).

## Risks / Trade-offs
- [Riesgo de Compatibilidad OPFS] OPFS (Origin Private File System) es relativamente moderno y puede tener quirks en navegadores antiguos. → Mitigación: Asegurarnos de probar en navegadores recientes como Chromium/Chrome donde OPFS es estable, asumiendo que el usuario target usará un entorno moderno o Electron.
- [Migraciones Complejas] Las modificaciones de esquema SQLite en el cliente pueden ser complicadas si no se controlan bien. → Mitigación: Usar un sistema básico de inicialización que verifique tablas (IF NOT EXISTS).
