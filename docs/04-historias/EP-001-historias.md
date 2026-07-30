---
epica: EP-001
titulo: Autenticación y Perfiles
estado: lista
---

# Historias de Usuario - EP-001: Autenticación y Perfiles

## HU-001: Selección de Perfil Local
**Como** usuario con cuenta creada
**Quiero** ver una pantalla de selección de perfiles al iniciar la aplicación
**Para** acceder a mis transacciones personales y preferencias.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Inicio exitoso (Happy Path)**
  - **Given** que existen usuarios registrados en SQLite
  - **When** abro la aplicación y selecciono mi perfil
  - **Then** el sistema procede a pedir la contraseña (flujo HU-009) o ingresa al Dashboard si la sesión está activa.
- **Scenario 2: Redirección a Onboarding (Edge Case / Empty State)**
  - **Given** que la base de datos está completamente vacía
  - **When** abro la aplicación
  - **Then** el sistema me redirige automáticamente a la pantalla de Onboarding (HU-010).
- **Scenario 3: Perfil eliminado recientemente (Error / Edge Case)**
  - **Given** que estoy viendo la lista de perfiles
  - **When** intento seleccionar un perfil que acaba de ser eliminado por un administrador en otra pestaña
  - **Then** el sistema me notifica que el perfil ya no existe y recarga la lista.

## HU-002: Gestión de Tema (Claro/Oscuro)
**Como** usuario logueado
**Quiero** alternar entre modo oscuro y claro en mis ajustes
**Para** usar la app cómodamente según la iluminación ambiental.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Cambio de tema (Happy Path)**
  - **Given** que estoy en el Dashboard
  - **When** hago clic en el toggle de "Modo Oscuro/Claro"
  - **Then** la interfaz cambia su esquema de colores de inmediato
  - **And** la preferencia se guarda en mi perfil de SQLite para futuras sesiones.
- **Scenario 2: Ausencia de preferencia guardada (Edge Case)**
  - **Given** que es la primera vez que inicio sesión
  - **When** el sistema carga mi perfil desde SQLite sin preferencia de tema explícita
  - **Then** el sistema aplica el tema por defecto (dark)
  - **And** se mantiene consistente en todas las vistas de la sesión.

## HU-007: Panel de Gestión de Usuarios y Roles
**Como** usuario con rol de Administrador
**Quiero** acceder a un panel donde pueda ver la lista de usuarios, crear nuevos perfiles, asignarles roles (los 3 base: Admin/Editor/Lector, o roles custom que yo mismo defina) y crear nuevos roles custom con sus propios permisos
**Para** permitir que otras personas compartan la misma aplicación con el nivel de acceso correcto, incluso niveles de acceso que los 3 roles base no cubren, sin tocar mis registros.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Creación exitosa de usuario (Happy Path)**
  - **Given** que el sistema reconoce mi sesión como rol 'Administrador'
  - **When** completo el formulario con un nuevo nombre, selecciono uno de los roles disponibles ('Admin', 'Editor' o 'Lector') y presiono "Guardar"
  - **Then** el nuevo perfil aparece en la lista de usuarios de forma inmediata con el rol asignado
  - **And** los datos persisten en la tabla `users` de SQLite.
- **Scenario 2: Validación de usuario duplicado (Error)**
  - **Given** que existe un usuario llamado "Carlos" en la base de datos
  - **When** intento crear un nuevo usuario con el nombre exacto "Carlos"
  - **Then** la acción es rechazada
  - **And** el sistema muestra el error "El nombre de usuario ya existe".
- **Scenario 3: Control de acceso estricto (Edge Case)**
  - **Given** que mi sesión activa tiene el rol 'Lector'
  - **When** intento forzar la navegación al Panel de Gestión de Usuarios mediante la URL directa
  - **Then** el sistema bloquea el acceso
  - **And** soy redirigido de vuelta al Dashboard principal.
- **Scenario 4: Prevención de auto-eliminación (Edge Case de Negocio)**
  - **Given** que mi sesión activa tiene el rol 'Administrador'
  - **When** intento eliminar mi propio perfil desde la lista de usuarios
  - **Then** el sistema deshabilita el botón de eliminar o bloquea la acción
  - **And** me notifica que un administrador no puede borrarse a sí mismo.
- **Scenario 5: Creación de rol custom (Extensibilidad)**
  - **Given** que el sistema reconoce mi sesión como rol 'Administrador'
  - **When** defino un nuevo rol con un nombre propio (ej. "Contador") y selecciono el conjunto de permisos que tendrá, distinto a los de Admin/Editor/Lector
  - **Then** el nuevo rol se guarda en la tabla `roles` de SQLite
  - **And** queda disponible de inmediato en el selector de roles al crear o editar cualquier usuario.

## HU-008: Navegación y Menú de Perfil
**Como** usuario autenticado en la aplicación
**Quiero** tener un menú de navegación global (lateral o superior) y un menú de perfil desplegable
**Para** poder cambiar fácilmente entre el Dashboard, la Configuración de la cuenta, la Gestión de Usuarios (si soy Admin) y poder cerrar sesión de forma ordenada.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Navegación entre vistas (Happy Path)**
  - **Given** que el estado del sistema registra una sesión activa
  - **When** hago clic en las opciones del menú lateral o superior (ej. "Dashboard" o "Usuarios")
  - **Then** la interfaz renderiza el componente correspondiente a la ruta de forma instantánea sin recargar la ventana del navegador.
- **Scenario 2: Cierre de sesión completo (Happy Path)**
  - **Given** que estoy navegando en la aplicación autenticado
  - **When** despliego mi menú de perfil y hago clic en "Cerrar sesión" (Logout)
  - **Then** mi estado de sesión global se limpia
  - **And** soy redirigido a la pantalla inicial de Login/Selección de perfil.
- **Scenario 3: Redirección de rutas inválidas (Edge Case)**
  - **Given** que el sistema tiene el enrutador inicializado
  - **When** ingreso manualmente una ruta que no existe (ej. `/configuracion-fantasma`) en la barra de direcciones
  - **Then** el sistema intercepta la petición
  - **And** muestra una pantalla 404 amistosa o me redirige al Dashboard por defecto.

## HU-009: Autenticación Segura Local
**Como** Administrador
**Quiero** asignar y requerir una contraseña para acceder a cada perfil
**Para** proteger la información financiera de cada persona frente a accesos no autorizados en el mismo dispositivo.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Inicio de sesión exitoso (Happy Path)**
  - **Given** que el usuario ha seleccionado un perfil existente en la pantalla de login
  - **When** ingresa la contraseña correcta asociada a ese perfil y confirma
  - **Then** el sistema permite el acceso al Dashboard
  - **And** establece la sesión activa para ese usuario.
- **Scenario 2: Contraseña incorrecta (Error)**
  - **Given** que el usuario ha seleccionado un perfil existente
  - **When** ingresa una contraseña que no coincide con el hash almacenado
  - **Then** el sistema deniega el acceso
  - **And** muestra el mensaje de error "Contraseña incorrecta".
- **Scenario 3: Creación de perfil con contraseña segura (Edge Case de Negocio)**
  - **Given** que un Administrador está creando o editando un perfil desde el panel de usuarios
  - **When** intenta asignar una contraseña con menos de 6 caracteres
  - **Then** el sistema bloquea la creación
  - **And** muestra una advertencia indicando que la contraseña debe ser más robusta.

## HU-010: Onboarding y Empty State
**Como** Usuario Nuevo (Primer acceso)
**Quiero** ver una pantalla de bienvenida amigable que explique el sistema de perfiles locales antes de crear el administrador
**Para** reducir la confusión y entender que los datos vivirán solo en este dispositivo.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Despliegue de Onboarding en estado vacío (Happy Path / Empty State)**
  - **Given** que el sistema detecta que la tabla de usuarios en SQLite está completamente vacía (0 registros)
  - **When** el usuario abre la aplicación por primera vez
  - **Then** el sistema presenta la pantalla gráfica de Onboarding explicando el uso de perfiles locales
  - **And** ofrece un botón de "Comenzar" para crear el primer administrador.
- **Scenario 2: Omisión automática si hay datos (Edge Case)**
  - **Given** que ya existen usuarios registrados en el sistema
  - **When** el usuario navega a la raíz de la aplicación o limpia su caché de sesión
  - **Then** el sistema omite el flujo de Onboarding
  - **And** muestra directamente la pantalla de selección de perfiles.
- **Scenario 3: Rechazo de creación sin entender el contexto (Error / Edge Case de negocio)**
  - **Given** que un usuario está en la pantalla de Onboarding
  - **When** intenta saltar directamente a la ruta protegida `/users` modificando la URL
  - **Then** el sistema bloquea el acceso redirigiéndolo nuevamente al Onboarding
  - **And** le notifica que debe configurar su perfil inicial.
