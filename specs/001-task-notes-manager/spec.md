# Feature Specification: Gestor de Tareas y Notas Inteligente (v3 - UX Refinements)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v3 Refinements)  
**Input**: Mejoras de experiencia de usuario (UX) solicitadas:
1. Formulario de creación colapsable mediante botón para ahorrar espacio en pantalla.
2. Mecanismo de marcado de tarea completada más intuitivo y visible.
3. Tarjetas de métricas superiores interactivas que filtran la lista al hacer clic sobre ellas (Total, Pendientes, Completadas, Vencidas).

---

## 1. Nuevas Historias de Usuario

### User Story 10 - Formulario Plegable bajo demanda (Priority: P1)
Como usuario, no quiero que el formulario ocupe espacio visual fijo todo el tiempo; quiero un botón "➕ Nueva Nota" que lo despliegue o lo oculte cuando lo necesite.
* **Acceptance Criteria**:
  - Por defecto, el formulario está oculto o minimizado.
  - Al pulsar "➕ Nueva Nota", se despliega suavemente y enfoca el campo de título.
  - Al guardar la nota o pulsar "Ocultar", el formulario se pliega de nuevo.

### User Story 11 - Métricas Superiores como Filtros Interactivos (Priority: P1)
Como usuario, quiero hacer clic en cualquiera de las 4 tarjetas de estadísticas superiores para filtrar el listado instantáneamente:
* Clic en **"Total Notas"**: Muestra todas las notas.
* Clic en **"Pendientes"**: Muestra solo notas pendientes.
* Clic en **"Completadas"**: Muestra solo notas completadas.
* Clic en **"Vencidas"**: Muestra solo notas cuya fecha límite ha expirado.
* **Acceptance Criteria**:
  - Las tarjetas tienen apariencia clicable (`cursor: pointer` y efecto hover).
  - La tarjeta seleccionada se resalta visualmente con un borde de acento.

### User Story 12 - Marcado intuitivo de tareas (Priority: P1)
Como usuario, quiero poder marcar una nota como completada de forma evidente tanto desde un botón de acción como desde el checkbox.
* **Acceptance Criteria**:
  - Cada tarjeta incluye un checkbox grande y accesible, y opcionalmente permite hacer clic en el título o botón de estado.

---

## 2. Nuevos Requisitos Funcionales

* **FR-012**: Formulario desplegable mediante animación con botón toggle de cabecera.
* **FR-013**: Interacción de filtrado por estado mediante clic en las tarjetas de estadísticas superiores.
* **FR-014**: Mejora de accesibilidad visual y retroalimentación táctil en el cambio de estado (completada/pendiente).
