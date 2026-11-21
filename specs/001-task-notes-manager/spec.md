# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.1 - Ergonomía de Tarjetas y Aprovechamiento de Espacio)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.1 Card Ergonomics: Flush-Right Actions, Matching Badge Size & Inline Resize Handle)  
**Input**:
1. Pegar los iconos de acción más a la derecha de la tarjeta.
2. Hacer los botones de acción del mismo tamaño (altura 26px y radio 6px) que la etiqueta de la categoría.
3. Situar el símbolo para aumentar/reducir tamaño (tirador de arrastre) a la misma altura que los botones para eliminar la línea inferior desaprovechada en la tarjeta.
4. Maximizar el espacio útil vertical para el título y la descripción de la nota.

---

## 1. User Story 29 - Ergonomía y Aprovechamiento del Espacio en Tarjetas
Como usuario, quiero que los botones de acción estén pegados al extremo derecho y tengan exactamente el mismo tamaño compacto que la etiqueta de la categoría, y que el tirador de redimensión esté integrado en la misma fila para no desperdiciar espacio vertical inferior, permitiendo ver mejor el título y la descripción de la nota.

* **Acceptance Criteria**:
  - **Alineación a la Derecha sin Espacio Muerto**:
    - Se elimina el margen derecho forzado (`padding-right: 1.4rem`) del pie de la tarjeta (`.note-footer`), permitiendo que el grupo de acciones se posicione a ras del margen derecho de la tarjeta.
  - **Unificación de Escala con la Etiqueta de Categoría**:
    - Los botones de acción rápida (`.btn-detail`, `.btn-edit`, `.btn-delete`) adoptan dimensiones de 26×26px y esquinas redondeadas de `border-radius: 6px`, igualando exactamente la altura de la insignia de categoría (`.badge`).
    - Los iconos vectoriales SVG internos se ajustan proporcionalmente a 13×13px con trazo nítido de `2.2px`.
  - **Tirador de Redimensión en la Misma Fila**:
    - El tirador de arrastre (`.card-resize-handle`) se traslada al interior de `.card-actions`, posicionándose en la misma fila horizontal justo después del botón de borrado.
    - Se elimina la franja vacía inferior en `.note-card` ajustando el padding inferior (`padding-bottom: 0.65rem`), liberando valiosa altura vertical para el cuerpo de la nota (`.note-body` / `.note-content` con hasta 5 líneas visibles).

---

## 2. Requisitos Funcionales

* **FR-039**: Formato `dd/mm/aa` y reubicación en la cabecera superior derecha de la nota.
* **FR-040**: Elevación de contraste de iconos de acción y etiqueta de fecha en temas claro y oscuro.
* **FR-041**: Identidad cromática por tipo de acción (Cian para Detalle, Ámbar para Editar, Coral/Rojo para Borrar) tanto en estado base como en hover.
* **FR-042**: Consistencia vectorial SVG de estilo moderno en los 3 botones de acción rápida.
* **FR-043**: Alineación a ras de borde derecho de las acciones y optimización del padding del footer.
* **FR-044**: Dimensiones normalizadas de 26×26px (`border-radius: 6px`) para los botones de acción, idénticas a la etiqueta `.badge`.
* **FR-045**: Integración del tirador de arrastre en línea dentro del pie de la tarjeta, liberando espacio para título y contenido.
