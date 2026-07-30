---
id: PRD-MANAGERBILLS
estado: borrador
version: 1.3.0
fecha: 2026-07-26
---

# Product Requirements Document (PRD) - ManagerBills

## 1. Título y Meta
- **Nombre del Producto**: ManagerBills (Registro de Ingresos/Gastos)
- **Autor**: Agent
- **Stakeholders**: Usuario final, Desarrolladores

## 2. Definición del Problema
Los usuarios (familias, freelancers o pequeños equipos) necesitan una forma sencilla y rápida de registrar sus ingresos y gastos, con la capacidad de manejar múltiples perfiles/usuarios y roles (ej. Admin, Lector). Además, requieren poder ver resúmenes mensuales en una interfaz cómoda que soporte modo claro y oscuro, con la flexibilidad de usarlo en web, móvil o escritorio (Windows), y sin preocuparse por pérdida de datos gracias a almacenamiento en SQLite.

## 3. Audiencia Objetivo
Personas naturales, familias o equipos pequeños que buscan llevar un control financiero compartido o personal sin fricción en múltiples dispositivos.

## 4. Propuesta de Valor
Una aplicación ligera e intuitiva (React) que permite gestionar múltiples usuarios con distintos roles, registrar transacciones financieras en segundos, y proveer resúmenes claros. Soporta modo oscuro/claro, empaquetado multiplataforma y almacenamiento robusto en SQLite offline.

## 5. Objetivos
- **Goles**:
  - Gestión de usuarios, perfiles y roles (Admin, Editor, Lector).
  - Permitir el registro rápido de ingresos y gastos asociado a un usuario.
  - Soportar categorización de transacciones.
  - Generar resumen mensual de totales.
  - Interfaz con soporte para Modo Claro y Modo Oscuro.
  - Base de código única en React (Web, Mobile, Desktop/Windows).
  - Almacenamiento seguro en SQLite.
- **Non-Goals**:
  - Conexión con bancos (open banking).
  - Multi-divisa (en la V1).

## 6. Funcionalidades (Requisitos)
1. **Gestión de Identidad y Seguridad**: Autenticación local segura (protección con contraseña y hashing local OPFS), perfiles de usuario y gestión de roles.
2. **Onboarding**: Flujo guiado inicial (Empty State) para orientar al usuario en la creación del primer administrador cuando la base de datos está vacía.
3. **Registro de Transacciones**: Formulario (monto, fecha, tipo, categoría, descripción) con trazabilidad del usuario creador.
4. **Categorización**: Lista de categorías predefinidas o personalizables por el admin.
5. **Resumen Mensual**: Vista dashboard (Ingresos, Gastos, Balance).
6. **Tematización**: Switcher nativo para Modo Oscuro y Modo Claro.

## 7. Flujos de Usuario / UX
- **Flujo de Onboarding**: App (0 usuarios) -> Pantalla de Bienvenida -> Crear Perfil Admin Inicial.
- **Flujo de Login**: App (con usuarios) -> Pantalla Selección de Perfil -> Ingreso de Contraseña -> Home.
- **Flujo de Registro**: Home -> Clic en '+' -> Llenar formulario -> Guardar -> Redirección a Home.
- **Flujo de Preferencias**: Menú Usuario -> Cambiar a Modo Oscuro.

## 8. Restricciones Técnicas
- Framework universal basado en React.
- Motor de persistencia relacional local (SQLite).
- Archivos HTML/JS originales mantenidos solo como prototipo UI.

## 9. Suposiciones
- Los usuarios usarán la app de forma colaborativa o individual en el mismo dispositivo, o la base de datos se compartirá a nivel de archivo.
- Los roles definen quién puede borrar/editar vs. solo leer transacciones.

## 10. Métricas de Éxito
- Configuración fluida de múltiples perfiles en la app.
- Uso sostenido tanto en modo claro como oscuro.

## 11. Riesgos
- Complejidad en la gestión de permisos locales y cifrado (OPFS).
- Riesgo de pérdida de acceso si el único administrador olvida su contraseña (requeriría manipulación manual de la DB local o flujos de recuperación offline).
- Migraciones de esquema en SQLite al añadir autenticación segura a instalaciones existentes.

## 12. Anexo A: Fases Secuenciales (Para Agentes)
- **Fase 1**: Configuración de entorno React. Integración de la capa SQLite. (El HTML original queda como prototipo).
- **Fase 2**: Modelado BD para Usuarios, Roles y Autenticación local.
- **Fase 3**: Modelado BD para Transacciones vinculadas a Usuarios. Implementación de Theme Provider (Claro/Oscuro).
- **Fase 4**: Construcción de UI (Dashboards y Formularios) con controles de acceso por rol.
- **Fase 5**: Empaquetado nativo multiplataforma.
