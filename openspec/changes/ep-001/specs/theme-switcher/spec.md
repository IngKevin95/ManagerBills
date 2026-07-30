## ADDED Requirements

### Requirement: Cambio y persistencia de Modo Oscuro/Claro
El sistema MUST proveer un control (toggle) para alternar entre el tema visual claro y oscuro, y la preferencia MUST guardarse en la base de datos local asociada al perfil del usuario.

#### Scenario: Alternar tema
- **WHEN** el usuario hace clic en el toggle de "Modo Oscuro"
- **THEN** la interfaz cambia inmediatamente su esquema de colores
- **AND** la preferencia de tema se guarda en SQLite para el perfil activo
