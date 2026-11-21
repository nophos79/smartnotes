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

---

## Phase 19: Formato dd/mm/aa Superior y Contraste Modo Oscuro v5.9 (Completado)
- [x] **T43**: Reubicar la fecha de vencimiento a la esquina superior derecha (`.note-header`) con formateador `dd/mm/aa` (ej: `01/12/26`).
- [x] **T44**: Mejorar la visibilidad y contraste en modo oscuro para los botones de acción (`#f1f5f9` sobre `#1e293b`) y la paleta de alto contraste para la fecha en ambos temas.

---

## Phase 20: Identidad Cromática e Iconos Modernos v6.0 (Completado)
- [x] **T45**: Aplicar paleta de color diferenciada para `.btn-detail` (Cian), `.btn-edit` (Ámbar) y `.btn-delete` (Carmesí/Rojo) en modo oscuro y claro (fondos sutilmente tintados, bordes a juego, colores de trazo específicos y efectos hover).
- [x] **T46**: Perfeccionar la iconografía vectorial SVG pura (15×15px, trazo 2.2, estilo moderno Lucide) en `src/app.js` y eliminar cualquier ambigüedad de visualización.

---

## Phase 21: Ergonomía de Tarjetas y Aprovechamiento de Espacio v6.1 (Completado)
- [x] **T47**: Redimensionar botones de acción a 26×26px con `border-radius: 6px` para igualar exactamente la escala y forma de la etiqueta de categoría (`.badge`).
- [x] **T48**: Eliminar el margen derecho forzado (`padding-right: 1.4rem`) en `.note-footer` para que los botones queden pegados al extremo derecho de la tarjeta.
- [x] **T49**: Reubicar el tirador de arrastre (`.card-resize-handle`) en la misma fila horizontal dentro de `.card-actions`, reduciendo el padding inferior de `.note-card` para eliminar la franja desaprovechada y maximizar la visibilidad de título y descripción.

---

## Phase 22: Alineación Inferior del Tirador de Redimensión v6.2 (Completado)
- [x] **T50**: Alinear verticalmente el icono de arrastre (`.card-resize-handle`) al borde inferior (`align-items: flex-end`, `padding-bottom: 1px`, `transform-origin: bottom center`) para nivelarlo con la base de los botones de acción rápida.

---

## Phase 23: Modo Fila Única y Margen Compacto v6.3 (Completado)
- [x] **T51**: Reducir la separación de cuadrícula a `gap: 0.5rem` y afinar el padding de `.note-card` para minimizar los márgenes entre tarjetas.
- [x] **T52**: Ampliar el rango de redimensión (ancho hasta 1800px, altura mínima 46px) e implementar el detector dinámico de 1 nota por fila (`checkSingleRowLayout`) reactivo a redimensionamiento y resize de ventana.
- [x] **T53**: Implementar la arquitectura de fila única en `src/app.js` y `src/styles.css` con orden: Checkbox y Categoría al inicio, Bloque de Texto en el centro, Fecha y Acciones al final.
- [x] **T54**: Configurar el flujo de texto continuo: título seguido de descripción en una sola fila (`nowrap` con elipsis en tamaño mínimo) o acotado a máximo 1 fila para título y 1 fila para descripción (2 líneas máximo).

---

## Phase 24: Selector de Vista Cuadrícula/Lista y Corrección de Truncado v6.4 (Completado)
- [x] **T55**: Añadir botón selector de vista (`#viewToggleBtn`) con soporte y persistencia de modos `grid` y `list` en `localStorage`.
- [x] **T56**: Aplicar exclusión mutua estricta de la categoría: en cuadrícula solo abajo con los botones; en lista solo arriba con el check; cero duplicidades.
- [x] **T57**: Establecer la altura mínima de tarjetas en modo cuadrícula en 110px para garantizar la proporción de las tarjetas compactas.
- [x] **T58**: Corregir el solapamiento en la cabecera aplicando `min-width: 0`, `flex: 1` y truncado con `text-overflow: ellipsis` estricto en título (antes de la fecha) y en la descripción.

---

## Phase 25: Vista Lista con Fecha Contigua y Título-Descripción Adyacente v6.5 (Completado)
- [x] **T59**: Reubicar la fecha límite (`.due-badge`) a continuación inmediata de la categoría (`.note-badge-row`) en la vista de lista (`.view-list`), manteniendo la posición superior derecha en la vista de cuadrícula sin duplicidades.
- [x] **T60**: Eliminar el espacio artificial en blanco entre título y descripción en vista lista mediante `width: auto !important`, `max-width: 55%` y espaciado fluido `gap: 0.35rem`.

---

## Phase 26: Restablecimiento Automático de Tamaño Mínimo en Cuadrícula v6.6 (Completado)
- [x] **T61**: Restablecer automáticamente el tamaño de las tarjetas a las dimensiones mínimas compactas (`width: 250px`, `height: 110px`) al conmutar a la vista de cuadrícula, actualizando variables CSS, persistencia en almacenamiento y constantes por defecto.

---

## Phase 27: Optimización de Márgenes Compactos y Exclusión de Redimensión en Lista v6.7 (Completado)
- [x] **T62**: Ocultar el tirador de redimensión (`.card-resize-handle`) y el botón `#resetCardSizeBtn` en la vista de lista (`.view-list`).
- [x] **T63**: Reducir el relleno y márgenes en blanco en las fichas de cuadrícula (`padding: 0.4rem 0.55rem 0.35rem 0.55rem; height: 98px;`) y en las filas de lista (`padding: 0.2rem 0.5rem; height: 36px;`).
