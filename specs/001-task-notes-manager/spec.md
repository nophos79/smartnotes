# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.6 - Reubicación de Acciones a Pie de Tarjeta)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v5.6 Bottom Actions & Full-Width Title)  
**Input**:
1. Los botones de detalle, lápiz (editar) y papelera (borrar) tapan y comprimen el título de la nota en la cabecera.
2. Reubicar los botones en la parte inferior de la tarjeta, junto a la categoría.
3. El botón detalle no necesita la etiqueta de texto "Detalle", con el icono `👁️` es suficiente.

---

## 1. User Story 24 - Título Despejado a Ancho Completo y Acciones Inferiores
Como usuario, quiero que el título de la nota disponga de todo el ancho superior de la tarjeta sin que ningún botón lo tape ni lo comprima, y que los botones de acción rápida (detalle, editar y eliminar) estén convenientemente ubicados en el pie de la tarjeta junto a la categoría.

* **Acceptance Criteria**:
  - La cabecera de la tarjeta (`.note-header`) contiene exclusivamente el botón de verificación y el título, permitiendo que el título ocupe el 100% del espacio disponible.
  - Los botones de acción rápida se sitúan en `.note-footer`:
    - Botón de detalle simplificado a icono: `👁️` (con tooltip explicativo).
    - Botón de edición: `✏️`.
    - Botón de eliminación: `🗑️`.
  - Los botones conviven armoniosamente con la insignia de categoría y la fecha de vencimiento sin solaparse con el tirador de arrastre de la esquina.

---

## 2. Requisitos Funcionales

* **FR-034**: Reorganización estructural del componente `.note-card`: cabecera exclusiva para verificación + título; pie compartido entre metadatos (categoría, fecha) y grupo `.card-actions` con botones iconográficos compactos.
