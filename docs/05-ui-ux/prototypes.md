# Prototipos Visuales - ManagerBills

## Prototipo Funcional (HTML/CSS/JS Vainilla)
Se ha generado un prototipo estático visual (Figma Nativo en código) que sirve de referencia para la construcción en React de la Interfaz de Usuario y el Sistema de Diseño (Glassmorphism, Modo Oscuro/Claro).

Los archivos del prototipo se encuentran ubicados para referencia de la fábrica de Build:
- `index.html` (Raíz): shell vacío de Vite/React (punto de montaje `#root`), NO es el prototipo.
- `prototype.html` (Raíz): Estructura semántica base del prototipo real.
- `prototype.css` (Raíz): Tokens de diseño, glassmorphism, y variables CSS para el cambio de tema.
- `prototype.js` (Raíz): Interacciones básicas, mock de datos y manipulación del DOM.
- `docs/05-ui-ux/onboarding-prototype.html`: Diseño estático del Empty State y flujo de Onboarding para nuevos usuarios.
- `docs/05-ui-ux/seleccion-perfil-prototype.html`, `gestion-usuarios-prototype.html`, `navegacion-prototype.html`, `autenticacion-prototype.html`: prototipos de HU-001, HU-007, HU-008 y HU-009 respectivamente.

**Instrucción para Build**: 
Consumir estos archivos para crear los componentes de React, asegurando que la UI final se alinee con las variables CSS definidas en `prototype.css` y aplique correctamente las interacciones usando estados de React. Especial atención al componente `onboarding-prototype.html` que debe renderizarse cuando SQLite retorne 0 usuarios.
