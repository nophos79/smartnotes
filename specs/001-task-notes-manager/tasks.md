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

---

## Phase 28: Arquitectura Híbrida Segura: SmartNotes.html y notas.json v7.0 (Completado)
- [x] **T64**: Implementar la persistencia de `FileSystemFileHandle` en IndexedDB (`SmartNotesFS`) y flujo de reconexión ágil en `src/app.js` con sugerencia predeterminada `notas.json`.
- [x] **T65**: Crear script compilador `scripts/build.js` y generar el ejecutable autónomo `SmartNotes.html` con CSS y JS autocontenidos en la raíz del proyecto para uso seguro en Google Drive / OneDrive.

---

## Phase 29: Persistencia Exclusiva en Carpeta Física (Cero Guardado en Navegador) v8.0 (Completado)
- [x] **T66**: Eliminar por completo el guardado y carga de notas y categorías en `localStorage` (cero persistencia en navegador).
- [x] **T67**: Implementar selección directa de carpeta con `window.showDirectoryPicker` y gestión automática de `notas.json` dentro de la carpeta con persistencia de `FileSystemDirectoryHandle` en IndexedDB.
- [x] **T68**: Simplificar la interfaz de usuario: eliminar modal redundante de archivos, suprimir botones de exportar/importar JSON y presentar estado limpio de conexión y bienvenida.

---

## Phase 30: Diálogos Nativos Reemplazados por Componente Modal Integrado v8.1 (Completado)
- [x] **T69**: Diseñar la estructura HTML y estilos CSS del modal de diálogo (`#customDialogModal`, `.custom-dialog-box`, animaciones, variantes de botón y soporte de tema).
- [x] **T70**: Implementar los métodos asíncronos `showAlert` y `showConfirm` en `NotesApp` con manejo de promesas, foco accesible y atajos de teclado (`Enter`, `Escape`).
- [x] **T71**: Reemplazar todas las invocaciones nativas a `alert()` y `confirm()` en `src/app.js`, recompilar `SmartNotes.html` y verificar funcionamiento visual.

---

## Phase 31: Estilización del Botón Ocultar y Flujo de Tabulación Ágil v8.2 (Completado)
- [x] **T72**: Rediseñar el botón `#closeFormBtn` con la clase `.btn-close-form` integrando bordes redondeados (`8px`), microinteracciones hover y compatibilidad con temas oscuro y claro.
- [x] **T73**: Implementar la navegación por teclado asistida con <kbd>Tab</kbd> y <kbd>Shift + Tab</kbd> en los formularios: Título -> Descripción -> Categoría -> Fecha -> Envío.
- [x] **T74**: Recompilar el ejecutable `SmartNotes.html` y verificar la experiencia de redacción fluida.

---

## Phase 32: Botón Cerrar Unificado y Fallback Resiliente de Selección Física v8.3 (Completado)
- [x] **T75**: Rediseñar `#closeFormBtn` adoptando la clase unificada `.btn` con icono y texto `✕ Cerrar`, garantizando perfecta legibilidad en modo claro y oscuro idéntica a "Guardar Nota".
- [x] **T76**: Implementar preservación del gesto de usuario (`onConfirmAction`) en `showAlert` para evitar pérdida del token de activación transitorio requerido por la API de archivos en Chromium.
- [x] **T77**: Incorporar soporte dual en IndexedDB y motor de persistencia para directorio (`dirHandle`) y archivo (`fileHandle`) con fallback transparente ante bloqueos de `file:///`.
- [x] **T78**: Recompilar el ejecutable autocontenido `SmartNotes.html` y validar persistencia directa sin bloqueos ni pérdidas de selección.

---

## Phase 33: Supresión de Chaining Inválido y Lanzador Local Iniciar_SmartNotes.bat v8.4 (Completado)
- [x] **T79**: Eliminar el encadenamiento inválido de `showSaveFilePicker` en el bloque `catch` de `showDirectoryPicker`, resolviendo el error `User activation required` / `Must be handling a user gesture to show a file picker`.
- [x] **T80**: Crear el servidor local autónomo `scripts/server.js` y el lanzador de 1 clic `Iniciar_SmartNotes.bat` para ejecutar en `http://localhost:3000` con soporte 100% nativo de la File System Access API.
- [x] **T81**: Añadir detección pedagógica de `window.location.protocol === 'file:'` en pantalla principal y alerta, guiando al usuario hacia `Iniciar_SmartNotes.bat`.
- [x] **T82**: Recompilar el ejecutable `SmartNotes.html` y verificar funcionamiento sin errores.

---

## Phase 34: Integración Nube Google Drive (OAuth 2.0 / GIS) y Sincronización Multiplataforma v9.0 (Completado)
- [x] **T83**: Añadir la biblioteca Google Identity Services (GIS) y meta tags móviles en `src/index.html`.
- [x] **T84**: Diseñar la interfaz de usuario en la barra lateral para Google Drive: tarjeta de sesión, botón de conexión oficial, avatar/email y botón para configurar Client ID.
- [x] **T85**: Implementar el modal interactivo de configuración de Google Client ID (`#googleConfigModal`) con instrucciones paso a paso y persistencia en `localStorage`.
- [x] **T86**: Desarrollar el módulo de sincronización con Google Drive API v3 (`drive.file`) en `src/app.js`: login, obtención de token, búsqueda/creación de `notas.json`, lectura y guardado automático con debouncing.
- [x] **T87**: Recompilar el ejecutable `SmartNotes.html` e `index.html` con `scripts/build.js` y verificar compatibilidad en PC y móvil.

---

## Phase 35: Favicon Oficial de Marca y Rediseño del Botón Salir v9.3 (Completado)
- [x] **T88**: Crear e incorporar el favicon SVG oficial con la marca de SmartNotes (`#4f46e5` con checkmark blanco `✓`) en formato vectorial inline data-URI y archivo `favicon.svg` en raíz y `src/`, eliminando favicons residuales o de otras apps en el navegador.
- [x] **T89**: Rediseñar el botón de desconexión `#disconnectDriveBtn` en la barra lateral con clase unificada `.btn-sync-disconnect`, icono SVG de salida y estilos visuales perfectamente armonizados con la tarjeta de sincronización y el sistema de temas (oscuro y claro).
- [x] **T90**: Actualizar `src/app.js` para alternar la visualización con `display: 'inline-flex'`.
- [x] **T91**: Recompilar el ejecutable `SmartNotes.html` e `index.html` con `scripts/build.js`, validar sintaxis con `node --check` y desplegar en GitHub Pages.

---

## Phase 36: Limpieza y Eliminación de Código y Archivos Obsoletos v9.4 (Completado)
- [x] **T92**: Eliminar lanzador innecesario `Iniciar_SmartNotes.bat` y servidor local `scripts/server.js` (ya sustituidos al 100% por GitHub Pages y Google Drive Cloud API).
- [x] **T93**: Eliminar el archivo huérfano `src/storage.js` (código inicial prototipo que no se utilizaba en ningún módulo).
- [x] **T94**: Purgar en `src/app.js` las funciones residuales de handles físicos de Chromium en IndexedDB (`saveStoredDirHandle`, `getStoredDirHandle`, etc.) reduciendo más de 160 líneas de código muerto.
- [x] **T95**: Actualizar la descripción visual de la tarjeta de inicio de sesión de Google Drive para especificar la carpeta oficial `SmartNotes / notas.json`.
- [x] **T96**: Recompilar el bundle standalone `SmartNotes.html` y raíz `index.html` con `scripts/build.js`, validar con `node --check` y desplegar a producción.

---

## Phase 37: Reubicación de Botón de Tema a Barra Superior y Modo Solo Símbolo v9.5 (Completado)
- [x] **T97**: Trasladar `#themeToggleBtn` desde el pie del sidebar a la barra superior derecha (`.topbar-right`), haciéndolo 100% visible sin necesidad de abrir el menú lateral en móviles ni hacer scroll.
- [x] **T98**: Rediseñar el botón con la clase `.theme-toggle-btn` en formato cuadrado redondeado (`38px x 38px`), conteniendo únicamente el símbolo (`🌙` / `☀️`) y tooltips modernos flotantes dinámicos.
- [x] **T99**: Limpiar estilos obsoletos de `.sidebar-footer` y actualizar `src/app.js` con soporte para atributos accesibles (`aria-label`, `data-tooltip`).
- [x] **T100**: Recompilar `SmartNotes.html` e `index.html` con `scripts/build.js`, validar sintaxis y desplegar en GitHub Pages.

---

## Phase 38: Solución Integral de Responsividad Móvil y Supresión de Desbordamiento Horizontal v9.6 (Completado)
- [x] **T101**: Reemplazar `width: 100vw` en `.app-layout` por `width: 100%; max-width: 100%; overflow-x: hidden;` evitando que las barras de scroll generen ancho excesivo en navegadores móviles.
- [x] **T102**: Añadir `min-width: 0; overflow-x: hidden;` en `.main-content` y habilitar flex wrap apilado en `.topbar` y `.topbar-right`.
- [x] **T103**: Ocultar etiquetas fijas "Texto:" y "Ordenar por:" en pantallas pequeñas (< 850px / 600px) permitiendo que los selectores y el botón de tema encajen en el 100% del ancho sin recortes.
- [x] **T104**: Configurar rejilla automática de 1 columna (`grid-template-columns: 1fr`) para smartphones (< 600px) y apilamiento vertical para los campos del formulario.
- [x] **T105**: Recompilar ejecutables standalone `SmartNotes.html` e `index.html`, validar sintaxis y desplegar en GitHub Pages.

---

## Phase 39: Implementación de PWA e Instalabilidad Nativa en Móvil v9.7 (Completado)
- [x] **T106**: Crear el archivo de manifiesto de aplicación web `manifest.json` en raíz y `src/` con configuración `standalone`, colores oficiales (`#4f46e5`, `#0f172a`) y vinculación de iconos.
- [x] **T107**: Desarrollar el Service Worker `sw.js` con ciclo de vida completo (`install`, `activate`, `fetch`) y estrategia network-first excluyendo peticiones a dominios de Google OAuth / Drive.
- [x] **T108**: Generar los iconos PNG de alta resolución (`icon-192.png` y `icon-512.png` maskable) con la identidad de marca de SmartNotes.
- [x] **T109**: Implementar el registro del Service Worker y el asistente de instalación interactivo `#pwaInstallBtn` en `src/app.js` (soporte `beforeinstallprompt` en Android y guía modal asistida en iOS Safari).
- [x] **T110**: Recompilar `SmartNotes.html` e `index.html`, validar sintaxis y desplegar en GitHub Pages.

---

## Phase 40: Rediseño Cromático del Icono e Imagotipo Oficial Esmeralda y Menta v9.8 (Completado)
- [x] **T111**: Diseñar el nuevo imagotipo vectorial SVG compuesto por gradiente vibrante Verde Esmeralda y Menta tecnológica (`#064e3b` -> `#059669` -> `#10b981` -> `#34d399`), silueta de libreta con pliegue de página, checkmark blanco puro y destello inteligente en menta neón (`#6ee7b7`).
- [x] **T112**: Reemplazar el icono en el sidebar por el nuevo imagotipo SVG vectorizado con brillo esmeralda y microinteracción hover.
- [x] **T113**: Actualizar `favicon.svg` y la etiqueta Data-URI en `<head>` con la paleta esmeralda.
- [x] **T114**: Regenerar los iconos rasterizados `icon-192.png` y `icon-512.png` para la pantalla de inicio móvil PWA.
- [x] **T115**: Recompilar ejecutables standalone `SmartNotes.html` e `index.html` con `scripts/build.js` y desplegar en GitHub Pages.
