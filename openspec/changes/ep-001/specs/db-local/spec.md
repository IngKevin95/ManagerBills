## ADDED Requirements

### Requirement: Inicialización y conexión de SQLite local
El sistema MUST inicializar una base de datos SQLite persistente localmente al arrancar la aplicación y exponer una interfaz para ejecutar consultas.

#### Scenario: Base de datos inicializada
- **WHEN** la aplicación web carga
- **THEN** la base de datos local (SQLite WASM/OPFS) se inicializa y está disponible para lectura y escritura
- **AND** se crean las tablas necesarias si no existen
