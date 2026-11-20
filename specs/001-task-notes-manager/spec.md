# Feature Specification: Gestor de Tareas y Notas Inteligente (v4 - Rediseño Full-Width & Sidebar)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v4 UI/UX Architecture Overhaul)  
**Input**:
1. Separación física del botón de Modo Claro/Oscuro de las acciones de creación y contenido.
2. Rediseño completo para aprovechar todo el ancho de pantalla (eliminando laterales vacíos en monitores anchos).
3. Estructura de panel lateral (Sidebar) para navegación y filtros + área de contenido fluida y responsiva.

---

## 1. User Story 14 - Layout Profesional con Sidebar y Aprovechamiento Total de Pantalla
Como usuario con muchas notas y pantalla ancha, quiero que la aplicación aproveche todo el espacio horizontal para ver más tarjetas a la vez sin desplazamientos infinitos, con un panel lateral fijo para navegar por estados y categorías.

* **Acceptance Criteria**:
  - **Sidebar Izquierdo**: Contiene el logo, botón principal `➕ Nueva Nota`, filtros por estado (Total, Pendientes, Completadas, Vencidas) con contadores dinámicos, listado interactivo de categorías con botón `+`, y al pie los controles de sistema separados (Modo Claro/Oscuro y Backup).
  - **Área Principal**: Aprovecha todo el ancho disponible (`max-width: 100%` con márgenes confortables). Muestra la barra de búsqueda ancha, el selector de ordenación y una rejilla fluida auto-ajustable (`repeat(auto-fill, minmax(290px, 1fr))`).
  - **Responsividad**: En pantallas móviles o estrechas (< 850px), el sidebar se pliega mediante un botón toggle de menú para no estorbar.

---

## 2. Requisitos Funcionales

* **FR-016**: Estructura CSS Grid/Flexbox full-width (Sidebar + Main Content).
* **FR-017**: Separación del toggle de tema en la zona inferior de configuración del Sidebar.
* **FR-018**: Adaptabilidad responsive con menú móvil colapsable.
