---
epica: EP-002
titulo: Gestión de Transacciones
estado: lista
---

# Historias de Usuario - EP-002: Gestión de Transacciones

## HU-003: Crear Registro Financiero
**Como** usuario logueado con permisos (Admin/Editor)
**Quiero** agregar un nuevo ingreso o gasto a través de un formulario rápido
**Para** mantener mis finanzas actualizadas sin esfuerzo.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Creación exitosa (Happy Path)**
  - **Given** que tengo sesión activa con rol Admin o Editor
  - **When** lleno monto, fecha, categoría y descripción, y hago clic en "Guardar"
  - **Then** la transacción se guarda en SQLite vinculada a mi ID
  - **And** el resumen del Dashboard se actualiza instantáneamente.
- **Scenario 2: Validación de campos obligatorios (Error)**
  - **Given** que dejo el campo monto vacío
  - **When** intento guardar el formulario
  - **Then** el sistema bloquea el guardado
  - **And** muestra un error indicando que el monto es obligatorio y debe ser mayor a 0.
- **Scenario 3: Monto negativo (Edge Case de Negocio)**
  - **Given** que tengo el formulario abierto con tipo "Gasto"
  - **When** ingreso un monto negativo (ej. -50)
  - **Then** el sistema rechaza el valor
  - **And** muestra una advertencia: "El monto debe ser un número positivo".

## HU-004: Restricciones de Lector
**Como** usuario con rol de Lector
**Quiero** que la interfaz oculte opciones de edición y borrado
**Para** no alterar los datos accidentalmente.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Ocultar controles de escritura (Happy Path)**
  - **Given** que el sistema registra una sesión con rol 'Lector'
  - **When** el usuario está en el Dashboard
  - **Then** el botón '+' no es visible
  - **And** las tarjetas de transacciones no muestran la opción de eliminar.
- **Scenario 2: Intento de acceso directo por URL (Edge Case de Seguridad)**
  - **Given** que el usuario tiene rol 'Lector'
  - **When** intenta navegar directamente a una ruta de acción de escritura (ej. `/nueva-transaccion`)
  - **Then** el sistema bloquea el acceso
  - **And** redirige al Dashboard con un mensaje de "No tienes permisos para esta acción".

## HU-011: Gestión de Categorías
**Como** usuario con rol de Administrador
**Quiero** crear, editar y eliminar categorías de ingresos/gastos
**Para** adaptar la clasificación de transacciones a mis necesidades reales sin depender de una lista fija.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Creación exitosa de categoría (Happy Path)**
  - **Given** que tengo sesión activa con rol Admin
  - **When** completo el nombre de una nueva categoría y presiono "Guardar"
  - **Then** la categoría aparece disponible de inmediato en el formulario de transacciones (HU-003)
  - **And** persiste en la tabla `categories` de SQLite.
- **Scenario 2: Categoría duplicada (Error)**
  - **Given** que ya existe la categoría "Alquiler"
  - **When** intento crear otra categoría llamada "Alquiler"
  - **Then** el sistema rechaza la acción
  - **And** muestra el error "Esta categoría ya existe".
- **Scenario 3: Eliminación de categoría en uso (Edge Case de Negocio)**
  - **Given** que la categoría "Transporte" está asignada a una o más transacciones existentes
  - **When** intento eliminarla
  - **Then** el sistema bloquea el borrado
  - **And** muestra un aviso indicando que debo reasignar esas transacciones antes de eliminar la categoría.
- **Scenario 4: Acceso restringido (Edge Case de Seguridad)**
  - **Given** que mi sesión activa tiene rol 'Editor' o 'Lector'
  - **When** intento navegar directamente a la pantalla de gestión de categorías
  - **Then** el sistema bloquea el acceso
  - **And** me redirige al Dashboard con un mensaje de "No tienes permisos para esta acción".
