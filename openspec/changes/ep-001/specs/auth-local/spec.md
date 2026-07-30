## ADDED Requirements

### Requirement: Autenticación Local
El sistema MUST permitir la creación de perfiles locales de usuario y la selección de uno activo. El primer usuario creado será "Admin".

#### Scenario: Crear primer perfil (Admin)
- **WHEN** la aplicación inicia y no existen usuarios en la base de datos
- **THEN** se muestra un flujo obligatorio para crear el perfil "Admin"

#### Scenario: Selección de perfil existente
- **WHEN** la aplicación inicia y existen usuarios registrados
- **THEN** se muestra una lista de perfiles
- **AND** al seleccionar uno, el usuario ingresa a la aplicación con ese contexto activo
