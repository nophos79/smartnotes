# Feature Specification: Gestor de Tareas y Notas Inteligente (v8.1 - Diálogos del Sistema Integrados Visualmente)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-22  
**Status**: Completed (v8.1 Custom Dialogs & Modal Unification)  
**Input**:
1. Sustituir todos los cuadros de diálogo nativos del navegador (`window.alert` y `window.confirm`) por componentes modales estilizados con la misma estética visual de la aplicación.
2. Homogeneizar colores, temas (modo claro y oscuro), tipografías, bordes redondeados y efectos visuales de desenfoque y animación.
3. Asegurar soporte accesible por teclado (`Enter`, `Escape`) y personalización contextual de iconos, títulos y botones de acción.

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
