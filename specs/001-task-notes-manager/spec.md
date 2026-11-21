# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.2 - Alineación Inferior del Tirador de Redimensión)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.2 Bottom-Aligned Resize Handle with Action Buttons)  
**Input**:
1. Alinear el símbolo de redimensión (tirador diagonal) con el borde inferior de los botones de detalle, editar y borrar, en lugar de estar centrado con los iconos.

---

## 1. User Story 30 - Alineación Inferior del Tirador de Redimensión
Como usuario, quiero que el icono diagonal de redimensión esté alineado con el borde inferior de los marcos de los botones de acción rápida, para que sirva como remate visual ordenado y simétrico de la esquina inferior de la tarjeta.

* **Acceptance Criteria**:
  - **Alineación Inferior Precisa**:
    - El contenedor `.card-resize-handle` alinea su SVG al borde inferior (`align-items: flex-end`) en lugar de centrarlo verticalmente.
    - Se añade un micro-ajuste inferior (`padding-bottom: 1px`) para que el trazo más bajo de las diagonales coincida con el borde inferior de los botones de acción (`.btn-action`).
    - El efecto hover escala manteniendo el anclaje inferior (`transform-origin: bottom center`).

---

## 2. Requisitos Funcionales

* **FR-039**: Formato `dd/mm/aa` y reubicación en la cabecera superior derecha de la nota.
* **FR-040**: Elevación de contraste de iconos de acción y etiqueta de fecha en temas claro y oscuro.
* **FR-041**: Identidad cromática por tipo de acción (Cian para Detalle, Ámbar para Editar, Coral/Rojo para Borrar) tanto en estado base como en hover.
* **FR-042**: Consistencia vectorial SVG de estilo moderno en los 3 botones de acción rápida.
* **FR-043**: Alineación a ras de borde derecho de las acciones y optimización del padding del footer.
* **FR-044**: Dimensiones normalizadas de 26×26px (`border-radius: 6px`) para los botones de acción, idénticas a la etiqueta `.badge`.
* **FR-045**: Integración del tirador de arrastre en línea dentro del pie de la tarjeta, liberando espacio para título y contenido.
* **FR-046**: Alineación del tirador de redimensión con el borde inferior de los marcos de los botones de acción (`align-items: flex-end`).
