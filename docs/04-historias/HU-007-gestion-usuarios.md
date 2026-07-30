---
id: HU-007
titulo: Panel de Gestión de Usuarios y Roles
epica: EP-001
prioridad: Alta
complejidad: Media
estado: lista
---

# HU-007: Panel de Gestión de Usuarios y Roles

**Como** usuario con rol de Administrador
**Quiero** acceder a un panel donde pueda ver la lista de usuarios, crear nuevos perfiles, asignarles roles (los 3 base: Admin/Editor/Lector, o roles custom que yo mismo defina) y crear nuevos roles custom con sus propios permisos
**Para** permitir que otras personas compartan la misma aplicación con el nivel de acceso correcto, incluso niveles de acceso que los 3 roles base no cubren, sin tocar mis registros.

## Check INVEST (Completado)
- [x] (I) Independiente: Puede desarrollarse una vez el esquema SQLite de usuarios esté listo, independientemente del módulo de transacciones.
- [x] (N) Negociable: La UI del CRUD puede ser desde una simple lista HTML hasta una tabla rica en interacciones; se puede simplificar en V1.
- [x] (V) Valiosa: El administrador centraliza quién y cómo se usa la app.
- [x] (E) Estimable: Operaciones CRUD básicas en SQLite, es directo de dimensionar (~2 puntos).
- [x] (S) Small: CRUD básico en la tabla `users` de SQLite.
- [x] (T) Testeable: Creación y verificación de permisos es directa.

## Criterios de Aceptación (Acceptance Criteria)

**Scenario 1: Creación exitosa de usuario (Happy Path)**
- **Given** que el sistema reconoce mi sesión como rol 'Administrador'
- **When** completo el formulario con un nuevo nombre, selecciono uno de los roles disponibles ('Admin', 'Editor' o 'Lector') y presiono "Guardar"
- **Then** el nuevo perfil aparece en la lista de usuarios de forma inmediata con el rol asignado
- **And** los datos persisten en la tabla `users` de SQLite.

**Scenario 2: Validación de usuario duplicado (Error)**
- **Given** que existe un usuario llamado "Carlos" en la base de datos
- **When** intento crear un nuevo usuario con el nombre exacto "Carlos"
- **Then** la acción es rechazada
- **And** el sistema muestra el error "El nombre de usuario ya existe".

**Scenario 3: Control de acceso estricto (Edge Case)**
- **Given** que mi sesión activa tiene el rol 'Lector'
- **When** intento forzar la navegación al Panel de Gestión de Usuarios mediante la URL directa
- **Then** el sistema bloquea el acceso
- **And** soy redirigido de vuelta al Dashboard principal.

**Scenario 4: Prevención de auto-eliminación (Edge Case de Negocio)**
- **Given** que mi sesión activa tiene el rol 'Administrador'
- **When** intento eliminar mi propio perfil desde la lista de usuarios
- **Then** el sistema deshabilita el botón de eliminar o bloquea la acción
- **And** me notifica que un administrador no puede borrarse a sí mismo.

**Scenario 5: Creación de rol custom (Extensibilidad)**
- **Given** que el sistema reconoce mi sesión como rol 'Administrador'
- **When** defino un nuevo rol con un nombre propio (ej. "Contador") y selecciono el conjunto de permisos que tendrá, distinto a los de Admin/Editor/Lector
- **Then** el nuevo rol se guarda en la tabla `roles` de SQLite
- **And** queda disponible de inmediato en el selector de roles al crear o editar cualquier usuario.
