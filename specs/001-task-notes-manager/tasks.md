# Task Breakdown: Gestor de Tareas y Notas Inteligente

**Branch**: `001-task-notes-manager` | **Date**: 2026-11-20 / 2026-11-21

---

## Phase 1 - 4: Core MVP (Completado)
- [x] **T01 - T08**: Arquitectura base, almacenamiento, formularios y reactividad.

## Phase 5: Expansión de Funcionalidades v2 (Completado)
- [x] **T10 - T15**: Due dates, modal edición, ordenación, temas y backup.

## Phase 6: Refinamientos de UX v3 (Completado)
- [x] **T16 - T18**: Formulario plegable, métricas clicables y botón táctil de completado.

## Phase 7: Gestión y Eliminación de Categorías v3.1 (Completado)
- [x] **T19**: Listado y eliminación de categorías con migración automática a General.

## Phase 8: Rediseño Full-Width, Sidebar y Ergonomía v4 (Completado)
- [x] **T20 - T22**: Layout Full-Width con Sidebar fijo y responsividad.

## Phase 10: Tarjetas de Tamaño Estándar y Modal de Detalle v4.2 (Completado)
- [x] **T24**: Fijar tamaño estándar uniforme en tarjetas (235px), truncado regular y visor modal de detalle.

## Phase 11: Sincronización de Archivo Físico v5 (Completado)
- [x] **T25 - T27**: File System Access API para guardado en disco/carpeta sincronizada.

## Phase 12: Deshacer Filtros & Rediseño de Completado v5.1 (Completado)
- [x] **T28 - T29**: Opción "Todas las categorías" y chips con botón [✕].

## Phase 13: Geometría Cuadrada Estilizada v5.2 (Completado)
- [x] **T30**: Geometría cuadrada estilizada con esquinas suavizadas (border-radius: 6px).

---

## Phase 14: Perfeccionamiento de Contraste e Iconos Modo Claro v5.3 (Completado)
- [x] **T31**: Aplicar paleta Slate-50 / Indigo-600 inspirada en Equigasto con alto contraste tipográfico.
- [x] **T32**: Corregir solapamiento de la lupa en el buscador con SVG vectorial y padding amplio.
- [x] **T33**: Sustituir emojis por iconos vectoriales nítidos en el botón principal (+).
- [x] **T34**: Asegurar preservación de User Gesture en File System Access API ejecutando `showSaveFilePicker`/`showOpenFilePicker` de forma síncrona antes de alterar el DOM del modal.

---

## Phase 15: Redimensionamiento Interactivo & Legibilidad Tipográfica v5.5 (Completado)
- [x] **T35**: Blindar la separación del buscador (`.search-box input[type="text"]` con `padding-left: 3.25rem !important` e icono centrado) ante cualquier sobreescritura de cascada CSS.
- [x] **T36**: Implementar redimensionamiento interactivo de tarjetas (tirador de arrastre en cada nota, recálculo sincrónico de `--card-min-width` y `--card-height` en todas las notas, y persistencia en localStorage).
- [x] **T37**: Optimizar tamaños de fuente base (títulos a `1.08rem`, cuerpo a `0.94rem`) e integrar selector de escala de texto (Normal, Grande, Muy Grande) con persistencia.

---

## Phase 16: Reubicación de Acciones a Pie de Tarjeta v5.6 (Completado)
- [x] **T38**: Trasladar el bloque de acciones (detalle con solo icono `👁️`, lápiz de editar `✏️` y papelera `🗑️`) al pie de la tarjeta (`.note-footer`) junto a la categoría, liberando todo el ancho superior para el título.

---

## Phase 17: Botones Enmarcados e Iconos Vectoriales SVG v5.7 (Completado)
- [x] **T39**: Unificar el diseño de la fecha límite (`.due-badge`) para que sea gemelo al tag de categoría en tamaño, padding, bordes redondeados (`border-radius: 6px`) y borde fino con SVG de calendario.
- [x] **T40**: Enmarcar los 3 botones de acción (`.btn-action`) con borde, fondo elevado y sustituir emojis por iconos vectoriales SVG nítidos (ojo, lápiz, papelera).

---

## Phase 18: Tooltips Modernos e Iconografía de Última Generación v5.8 (Completado)
- [x] **T41**: Implementar el sistema de tooltips flotantes modernos (`#appTooltip`), silenciando los tooltips antiguos del navegador y posicionándolos dinámicamente con animación fluida.
- [x] **T42**: Actualizar la iconografía de los botones de tarjeta a diseños vectoriales contemporáneos (ojo moderno con pupila centrada, pluma estilizada, papelera moderna de doble ranura) y optimizar el tamaño de los botones a 30×30px con `border-radius: 8px`.
