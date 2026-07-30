# Proposal: EP-001 Admin & Navigation Extension

## Objetivo
Implementar la interfaz gráfica y la lógica para el Panel de Gestión de Usuarios y Roles (HU-007) y la barra de navegación principal con menú de perfil (HU-008). 
Estas características completan la Épica EP-001 (Autenticación y Perfiles).

## Alcance
- **Ruteo**: Incorporación de `react-router-dom` para manejar vistas (Dashboard, Usuarios).
- **Layout Global**: Componente envolvente con Navbar, Menú de Perfil y cierre de sesión.
- **Vista de Usuarios**: Acceso restringido (solo Admin) a la administración de perfiles en SQLite.

## Beneficios
- Permite al Administrador invitar/crear otros usuarios con permisos restringidos.
- Proporciona una base sólida de navegación (Navbar) para futuras épicas (Transacciones, Dashboards).
