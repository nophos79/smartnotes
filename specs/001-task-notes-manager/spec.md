# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.1 - UX Refinement: Filtros & Checkbox)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v5.1 Filter Reset & Completion UX)  
**Input**:
1. Poder deshacer o limpiar el filtro de categoría fácilmente una vez seleccionada una.
2. Rediseñar el aspecto visual del control de marcado/desmarcado de notas completadas.

---

## 1. User Story 18 - Deselección Clara de Filtros
Como usuario, quiero una forma visual y directa de volver a "Todas las categorías" o quitar cualquier filtro activo con 1 clic.
* **Acceptance Criteria**:
  - En la lista de categorías del Sidebar, el primer elemento es siempre **`📁 Todas las categorías`**.
  - Si hay un filtro de categoría activo, la barra superior muestra un chip distintivo con un botón **`✕`** para quitar el filtro al instante.

## 2. User Story 19 - Control de Completado Elegante y Moderno
Como usuario, quiero un botón de marcado de tarea más estético, sutil e intuitivo (estilo Apple Reminders / Things 3).
* **Acceptance Criteria**:
  - Se sustituye el cuadro cuadrado por un **anillo circular minimalista**.
  - En estado pendiente: anillo sutil que al pasar el ratón muestra un tick suave en verde.
  - En estado completado: círculo relleno en verde esmeralda con el icono de verificación blanco y micro-animación.
  - El texto del título se tacha y se atenúa suavemente con una transición limpia.

---

## 3. Requisitos Funcionales

* **FR-025**: Opción de reseteo explícito de categorías en Sidebar y chip de descarte en la cabecera.
* **FR-026**: Rediseño CSS del componente de verificación a checkbox circular interactivo.
