---
id: HU-009
titulo: Autenticación Segura Local
epica: EP-001
prioridad: Alta
complejidad: Media
estado: lista
---

# HU-009: Autenticación Segura Local

**Como** Administrador
**Quiero** asignar y requerir una contraseña para acceder a cada perfil
**Para** proteger la información financiera de cada persona frente a accesos no autorizados en el mismo dispositivo.

## Check INVEST (Completado)
- [x] (I) Independiente: Puede desarrollarse sin afectar el flujo de creación de transacciones ni otras lógicas ajenas a la sesión.
- [x] (N) Negociable: Las reglas de complejidad (ej. 6 caracteres) o el algoritmo de cifrado en OPFS son flexibles según capacidad del equipo.
- [x] (V) Valiosa: Evita exposición de datos financieros sensibles entre usuarios de un mismo dispositivo.
- [x] (E) Estimable: El alcance técnico (un input de contraseña, una función hash y validación) es predecible y fácilmente dimensionable.
- [x] (S) Small: Se limita a añadir hashing local de una contraseña y una validación extra al elegir perfil.
- [x] (T) Testeable: Validar que un hash incorrecto deniega el login y uno correcto lo permite.

## Criterios de Aceptación (Acceptance Criteria)

**Scenario 1: Inicio de sesión exitoso (Happy Path)**
- **Given** que el usuario ha seleccionado un perfil existente en la pantalla de login
- **When** ingresa la contraseña correcta asociada a ese perfil y confirma
- **Then** el sistema permite el acceso al Dashboard
- **And** establece la sesión activa para ese usuario.

**Scenario 2: Contraseña incorrecta (Error)**
- **Given** que el usuario ha seleccionado un perfil existente
- **When** ingresa una contraseña que no coincide con el hash almacenado
- **Then** el sistema deniega el acceso
- **And** muestra el mensaje de error "Contraseña incorrecta".

**Scenario 3: Creación de perfil con contraseña segura (Edge Case de Negocio)**
- **Given** que un Administrador está creando o editando un perfil desde el panel de usuarios
- **When** intenta asignar una contraseña con menos de 6 caracteres
- **Then** el sistema bloquea la creación
- **And** muestra una advertencia indicando que la contraseña debe ser más robusta.
