---
epica: EP-003
titulo: Dashboard y Resumen
estado: lista
---

# Historias de Usuario - EP-003: Dashboard y Resumen

## HU-005: Visualización de Balance Mensual
**Como** usuario autenticado (cualquier rol)
**Quiero** ver un resumen de mis ingresos totales, gastos totales y balance general del mes seleccionado
**Para** conocer rápidamente mi situación financiera actual.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Navegación estándar al Dashboard (Happy Path)**
  - **Given** que he iniciado sesión exitosamente
  - **When** accedo a la vista de "Home/Dashboard"
  - **Then** veo tarjetas individuales para "Balance Total", "Ingresos" y "Gastos"
  - **And** los montos reflejan las transacciones del mes y año actuales.
- **Scenario 2: Mes sin transacciones (Empty State)**
  - **Given** que me encuentro en un mes sin actividad registrada
  - **When** visualizo las tarjetas del Dashboard
  - **Then** todos los valores se muestran en cero ($0.00)
  - **And** la lista inferior muestra el mensaje "No hay transacciones este mes".
- **Scenario 3: Primer acceso sin datos históricos (Edge Case)**
  - **Given** que el usuario acaba de completar el Onboarding y no ha creado ninguna transacción
  - **When** llega al Dashboard por primera vez
  - **Then** todos los valores muestran $0.00
  - **And** se muestra un CTA (call-to-action) sugiriendo registrar el primer movimiento.

## HU-006: Filtrado por Selector de Mes
**Como** usuario autenticado
**Quiero** poder cambiar el mes y año desde un selector en el encabezado
**Para** revisar mi historial financiero de períodos anteriores.

**Criterios de Aceptación (BDD):**
- **Scenario 1: Retroceder a un mes anterior (Happy Path)**
  - **Given** que estoy visualizando el Dashboard del mes actual
  - **When** hago clic en la flecha de "mes anterior" en el selector del encabezado
  - **Then** la etiqueta se actualiza al mes anterior (ej. de "Agosto 2026" a "Julio 2026")
  - **And** las tarjetas y lista se actualizan para reflejar únicamente ese período.
- **Scenario 2: Navegación a mes futuro (Edge Case)**
  - **Given** que estoy viendo el mes actual
  - **When** hago clic en la flecha de "mes siguiente"
  - **Then** el sistema permite navegar al futuro
  - **And** si no hay transacciones, los totales muestran $0.00 sin error.
- **Scenario 3: Selector en el primer mes disponible (Edge Case de Límite)**
  - **Given** que navego hacia atrás hasta el primer mes con datos
  - **When** intento retroceder un mes más allá del límite histórico
  - **Then** la flecha de "mes anterior" se deshabilita
  - **And** el usuario no puede navegar a períodos sin registro.
