# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.7 - Botones Enmarcados y Armonía de Metadatos)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v5.7 Framed Action Buttons & Date Badge Alignment)  
**Input**:
1. Aspecto visual de la fecha similar al tag de categoría en cuanto a tamaño, padding, bordes redondeados y estilo de borde.
2. El icono del botón detalle cuesta verlo en modo claro (emoji poco contrastado).
3. Enmarcar los 3 iconos (detalle, edición, borrado) como botones táctiles elegantes con bordes, fondos adaptativos e iconos vectoriales SVG nítidos.

---

## 1. User Story 25 - Botones de Acción Enmarcados y Armonía de Etiquetas
Como usuario, quiero que la fecha límite tenga la misma presencia y geometría que la categoría, y que las 3 acciones del pie de la nota estén delimitadas en botones enmarcados con iconos vectoriales SVG de alto contraste para identificarlas y pulsarlas con total claridad tanto en modo claro como en modo oscuro.

* **Acceptance Criteria**:
  - **Armonía de Etiquetas**:
    - `.due-badge` comparte exactamente el mismo tamaño de fuente (`0.78rem`), padding (`0.25rem 0.6rem`), esquinas redondeadas (`border-radius: 6px`) y borde fino que `.badge`.
    - La fecha incluye un icono vectorial SVG de calendario nítido.
  - **Botones Enmarcados (`.btn-action`)**:
    - Cada acción se presenta en un botón enmarcado táctil (`width: 30px`, `height: 30px`, `border-radius: 6px`, borde suave y fondo sutil con elevación).
    - Los 3 botones utilizan iconos vectoriales SVG nítidos:
      - Ojo vectorial para ver detalle (alto contraste en modo claro/oscuro).
      - Lápiz vectorial para editar.
      - Papelera vectorial para eliminar con feedback hover en rojo.

---

## 2. Requisitos Funcionales

* **FR-035**: Unificación geométrica y tipográfica de `.badge` y `.due-badge`.
* **FR-036**: Enmarcado interactivo de botones `.btn-action` con vectorización SVG pura en sustitución de emojis de baja visibilidad.
