---
id: HU-010
titulo: Onboarding y Empty State
epica: EP-001
prioridad: Media
complejidad: Baja
estado: lista
---

# HU-010: Onboarding y Empty State

**Como** Usuario Nuevo (Primer acceso)
**Quiero** ver una pantalla de bienvenida amigable que explique el sistema de perfiles locales antes de crear el administrador
**Para** reducir la confusión y entender que los datos vivirán solo en este dispositivo.

## Check INVEST (Completado)
- [x] (I) Independiente: El Onboarding no tiene dependencias fuertes; es un estado previo absoluto. Solo evalúa si la BD está vacía.
- [x] (N) Negociable: La cantidad de pantallas de onboarding y su copy se pueden ajustar sin perder la esencia de la historia.
- [x] (V) Valiosa: Evita el abandono del usuario en el primer impacto y clarifica la privacidad (datos offline).
- [x] (E) Estimable: Su implementación requiere solo detectar el `COUNT` de usuarios al inicio y renderizar un componente React simple.
- [x] (S) Small: Solo implica una vista inicial orientativa que precede al flujo de registro existente.
- [x] (T) Testeable: Validar que si la DB de usuarios está vacía, se renderice esta vista en lugar del formulario directo.

## Criterios de Aceptación (Acceptance Criteria)

**Scenario 1: Despliegue de Onboarding en estado vacío (Happy Path / Empty State)**
- **Given** que el sistema detecta que la tabla de usuarios en SQLite está completamente vacía (0 registros)
- **When** el usuario abre la aplicación por primera vez
- **Then** el sistema presenta la pantalla gráfica de Onboarding explicando el uso de perfiles locales
- **And** ofrece un botón de "Comenzar" para crear el primer administrador.

**Scenario 2: Omisión automática si hay datos (Edge Case)**
- **Given** que ya existen usuarios registrados en el sistema
- **When** el usuario navega a la raíz de la aplicación o limpia su caché de sesión
- **Then** el sistema omite el flujo de Onboarding
- **And** muestra directamente la pantalla de selección de perfiles.

**Scenario 3: Rechazo de creación sin entender el contexto (Error / Edge Case de negocio)**
- **Given** que un usuario está en la pantalla de Onboarding
- **When** intenta saltar directamente a la ruta protegida `/users` modificando la URL
- **Then** el sistema bloquea el acceso redirigiéndolo nuevamente al Onboarding
- **And** le notifica que debe configurar su perfil inicial.
