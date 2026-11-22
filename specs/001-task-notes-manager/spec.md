# Feature Specification: Gestor de Tareas y Notas Inteligente (v8.2 - Botón Ocultar Estilizado y Tabulación Secuencial de Formulario)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-22  
**Status**: Completed (v8.2 Form Close Button Styling & Tab Navigation Order)  
**Input**:
1. Modificar la apariencia del botón "Ocultar" del formulario de nueva nota para que tenga exactamente la misma estética visual pulida que el resto de los botones de la app.
2. Modificar la secuencia de navegación con tabulador en los formularios para que el flujo sea: primero Título, luego Descripción, y posteriormente Categoría y Fecha límite.

---

## 1. User Story 39 - Estética del Botón Ocultar y Flujo de Tabulación Ágil
Como usuario, quiero que el botón "Ocultar" del formulario tenga un aspecto integrado y estilizado acorde a la app, y que al pulsar Tabulador desde el título pase directamente a la descripción antes que a la categoría y fecha, para redactar mis notas más rápido con el teclado.

* **Acceptance Criteria**:
  - **Botón Ocultar Estilizado (`.btn-close-form`)**:
    - Se elimina el aspecto tosco por defecto del navegador.
    - Se aplica fondo de tarjeta, bordes suaves (`8px`), texto y sutil sombra en modo oscuro y claro, con realce en `--accent` al pasar el cursor.
  - **Secuencia de Tabulación Asistida**:
    - Al pulsar <kbd>Tab</kbd> desde el campo Título (`#noteTitle`), el foco pasa inmediatamente al campo Descripción (`#noteContent`).
    - Al pulsar <kbd>Tab</kbd> desde Descripción, pasa a Categoría (`#noteCategory`).
    - Al pulsar <kbd>Tab</kbd> desde Categoría, pasa a Fecha límite (`#noteDueDate`).
    - Al pulsar <kbd>Tab</kbd> desde Fecha límite, pasa al botón de envío `Guardar Nota`.
    - Soporte recíproco con <kbd>Shift + Tab</kbd> para retroceder en el orden inverso exacto.

---

## 1. User Story 38 - Diálogos del Sistema Homogéneos e Integrados Visualmente
Como usuario, quiero que todos los mensajes de aviso, errores y confirmaciones de eliminación se muestren con el mismo diseño visual moderno y coherente que el resto de la aplicación, en lugar de ventanas emergentes blancas y toscas del navegador.

* **Acceptance Criteria**:
  - **Componente Modal Unificado**:
    - Se reemplazan todas las invocaciones a `alert()` y `confirm()` por modales nativos de la aplicación.
    - Soporte completo para el tema activo (oscuro y claro), con bordes estilizados, desenfoque de fondo y sombras acordes al diseño.
  - **Variantes Informativas y de Confirmación**:
    - Diálogos informativos / advertencia (`showAlert`): icono contextual, título claro, mensaje formateado y botón de aceptación contextual.
    - Diálogos de confirmación (`showConfirm`): soporte para acciones estándar y destructivas (`btn-danger`), con botones de confirmación y cancelación retornando promesas booleanas.
  - **Experiencia de Usuario y Accesibilidad**:
    - Cierre rápido con tecla `Escape` o clic en el backdrop.
    - Aceptación inmediata con tecla `Enter`.
    - Auto-enfoque automático del botón principal para máxima agilidad operativa.

---

## 1. User Story 37 - Persistencia Exclusiva en Carpeta Física (Sin Almacenamiento en Navegador)
Como usuario, quiero que mis tareas se guarden única y exclusivamente en un archivo `notas.json` dentro de la carpeta que yo elija (Google Drive, OneDrive o local), sin que nada se guarde en la memoria interna del navegador (`localStorage`), y con una interfaz sencilla donde solo deba seleccionar la carpeta una sola vez sin diálogos confusos.

* **Acceptance Criteria**:
  - **Cero Persistencia de Notas en el Navegador**:
    - Las tareas y categorías no se leen ni se escriben en `localStorage`.
    - Si no hay una carpeta vinculada, la aplicación no guarda notas fantasma en el navegador: muestra un estado inicial claro invitando a seleccionar la carpeta de trabajo.
  - **Selección Directa de Carpeta (`showDirectoryPicker`)**:
    - La selección de almacenamiento se realiza directamente mediante el selector de carpetas del sistema operativo.
    - Se elimina el modal anterior ("abrir archivo existente vs crear nuevo") y los botones de exportar/importar JSON.
    - La aplicación busca o crea automáticamente el archivo `notas.json` dentro de la carpeta seleccionada.
  - **Indicador y Control de Carpeta en la Barra Lateral**:
    - Muestra claramente el nombre de la carpeta activa y el archivo objetivo (`notas.json`).
    - Botón simple: "Seleccionar Carpeta" o "Cambiar Carpeta", con botón de desvinculación rápida.
  - **Reconexión Persistente (IndexedDB)**:
    - El puntero de la carpeta (`FileSystemDirectoryHandle`) se almacena en IndexedDB.
    - Al reabrir `SmartNotes.html`, detecta la carpeta guardada y solicita confirmación con un solo clic para cargar las notas de `notas.json`.

---

## 2. Requisitos Funcionales

* **FR-051**: Botón conmutador de vista (`grid` vs `list`) con persistencia de preferencia en `localStorage`.
* **FR-052**: Regla de exclusión mutua de categoría: pie en cuadrícula, inicio en lista; cero duplicidades.
* **FR-053**: Altura mínima acotada para tarjetas en modo cuadrícula.
* **FR-054**: Truncado con elipsis anticolisión entre el título y la fecha límite, y en la descripción.
* **FR-055**: Posicionamiento contextual de la fecha límite: contigua a la categoría en vista lista, superior derecha en vista cuadrícula.
* **FR-056**: Flujo continuo y adyacente entre título y descripción en vista lista sin espacios intermedios fantasma.
* **FR-057**: Restablecimiento automático a dimensiones mínimas compactas al regresar a la vista de cuadrícula.
* **FR-058**: Ocultación estricta de controles de redimensión (tirador y botón restablecer) en la vista de lista.
* **FR-059**: Optimización de márgenes y eliminación de espacios en blanco perimetrales en tarjetas y filas.
* **FR-060**: Compilación y mantenimiento del ejecutable autocontenido `SmartNotes.html` (CSS + JS integrados en solo lectura).
* **FR-063**: Supresión completa del almacenamiento de notas y categorías en `localStorage`.
* **FR-064**: Integración con `showDirectoryPicker` para selección única de carpeta física y gestión automática de `notas.json`.
* **FR-065**: Simplificación de la interfaz: eliminación de modales de archivo, botones de backup redundantes y presentación del estado de carpeta.
* **FR-066**: Reemplazo integral de `window.alert` y `window.confirm` por un componente de diálogo modal nativo de la aplicación.
* **FR-067**: Soporte para variantes informativas (`showAlert`) y confirmaciones destructivas (`showConfirm`) con promesas asíncronas.
* **FR-068**: Integración visual con temas (claro/oscuro), accesibilidad con teclado (`Enter`, `Escape`), animaciones y botones temáticos.
* **FR-069**: Rediseño visual del botón "Ocultar" del formulario (`.btn-close-form`) con bordes redondeados, sombra, microinteracciones y armonía en temas claro/oscuro.
* **FR-070**: Flujo de navegación por teclado bidireccional asistido con tabulador (Título -> Descripción -> Categoría -> Fecha -> Envío).
* **FR-071**: Botón "✕ Cerrar" en cabecera del formulario con estilo unificado idéntico a "Guardar Nota" (`class="btn"`), máxima visibilidad y consistencia en temas claro y oscuro.
* **FR-072**: Motor resiliente de persistencia física con preservación del gesto de usuario (invocación sincrónica `onConfirmAction`).
* **FR-073**: *(Obsoleto / Retirado en v9.4)* Lanzador local asistido `Iniciar_SmartNotes.bat` y servidor `scripts/server.js`, sustituidos por despliegue web universal en GitHub Pages y Google Drive API.
* **FR-074**: Integración con Google Identity Services (GIS) y OAuth 2.0 con alcance de privilegio mínimo `https://www.googleapis.com/auth/drive.file`.
* **FR-075**: Gestión de almacenamiento en la nube en Google Drive (`Mi unidad / SmartNotes / notas.json`) con búsqueda/creación automática de carpeta y archivo, lectura y guardado desasistido en tiempo real.
* **FR-076**: Client ID integrado de forma permanente en código (`271897859589-s3qq098gbqn4kct6csmofn3psprqqac6.apps.googleusercontent.com`), permitiendo login directo en 1 clic sin pasos de configuración manual.
* **FR-077**: Barra de estado de sincronización en tiempo real con indicador de estado (Desconectado, Conectando, Sincronizado, Guardando en Drive) y botón estilizado de salida.
* **FR-078**: Optimización para dispositivos móviles (PWA / meta tags para pantalla completa) para acceso fluido desde smartphones y tablets.
* **FR-079**: Favicon SVG oficial de SmartNotes en formato vectorial inline Data-URI y archivo estático `favicon.svg`.
* **FR-080**: Limpieza y depuración estricta de dependencias locales obsoletas (`.bat`, servidores de prueba, handles IDB residuales).
* **FR-081**: Botón de cambio de tema (Modo Claro / Modo Oscuro) optimizado con icono exclusivo (`🌙` / `☀️`) y reubicado en la barra superior derecha (`.topbar-right`), garantizando visibilidad inmediata y permanente en móvil y escritorio.
* **FR-082**: Responsividad móvil absoluta sin scroll horizontal: erradicación de `100vw`, layout con contención estricta (`min-width: 0`), topbar flexible con selects al 100%, rejilla automática en 1 columna en smartphones y formulario fluido.
* **FR-083**: Soporte PWA completo e instalabilidad nativa en smartphone y escritorio: Web App Manifest (`manifest.json`), Service Worker (`sw.js`) con estrategia network-first y bypass de APIs de Google, iconos PNG (192px y 512px maskable) y botón reactivo de instalación asistida.
* **FR-084**: Identidad visual oficial de SmartNotes en tonos Verde Esmeralda y Menta tecnológica (`#064e3b` -> `#059669` -> `#10b981` -> `#34d399`), con símbolo de libreta estilizada con pliegue de notas, checkmark blanco en relieve y destello inteligente en menta neón (`#6ee7b7`), unificado en favicon, sidebar, manifest y pantallas móviles.
* **FR-085**: Optimización de accesibilidad móvil para creación de notas mediante Botón Flotante de Acción Rápida (FAB `+`) fijo en esquina inferior derecha (`58x58px` con microinteracción de rotación a `✕` en apertura y auto-scroll suave) y botón directo en cabecera superior; retirada del botón redundante de instalación en la barra lateral para dejar la instalación de la app exclusivamente a través del menú nativo del navegador (Chrome, Edge, Safari, Samsung Internet).
* **FR-086**: Unificación del estado visual de todas las listas desplegables (`<select>`): supresión de selectores nativos del sistema operativo (`appearance: none`), integración de chevron SVG estilizado en verde esmeralda interactivo (hover/focus), alturas homogéneas (38px en topbar, 44px en formularios), radio de 8px y compatibilidad perfecta en temas claro y oscuro.
* **FR-087**: Persistencia de sesión de Google Drive y caché local offline: almacenamiento seguro de tokens con control de expiración (`expires_at`), reconexión silenciosa automática (`prompt: ''`), caché instantánea en `localStorage` para evitar pantallas en blanco al abrir/cerrar la aplicación, y confirmación dialogada antes de cerrar sesión.
