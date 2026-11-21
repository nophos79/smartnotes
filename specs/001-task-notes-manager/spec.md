# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.5 - Vista Lista con Fecha Contigua a Categoría y Flujo Continuo)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.5 List View Adjacent Due Date & Fluid Title-Description Flow)  
**Input**:
1. En la vista de lista (modo una tarea por línea), posicionar la fecha límite si la hay inmediatamente a continuación de la categoría.
2. En la vista de lista, eliminar el espacio en blanco artificial entre el título y la descripción, haciendo que el separador y la descripción aparezcan pegados inmediatamente al texto del título.
3. En la vista de cuadrícula, mantener la fecha en la esquina superior derecha y la categoría en el pie de la tarjeta.

---

## 1. User Story 33 - Vista Lista con Fecha Contigua a Categoría y Flujo Continuo sin Espacios Fantasma
Como usuario, cuando utilizo la vista de lista (una tarea por fila), quiero que la fecha límite se ubique justo a continuación de la categoría al inicio de la fila, y que el título y la descripción fluyan de forma continua sin un espacio en blanco artificial intermedio, facilitando una lectura compacta y natural de cada tarea.

* **Acceptance Criteria**:
  - **Fecha Contigua a Categoría en Modo Lista**:
    - En la vista de lista (`.view-list`), si la tarea cuenta con fecha límite, la insignia `.due-badge` se posiciona inmediatamente después del distintivo de categoría (`.note-badge-row`), manteniendo el mismo alineamiento vertical y escala.
    - El orden de lectura visual al inicio de cada fila queda: `[ Checkbox ] [ Categoría ] [ Fecha (si hay) ] Título — Descripción`.
  - **Preservación de Fecha en Vista Cuadrícula**:
    - En la vista de cuadrícula (`.view-grid` o vista por defecto), la fecha límite permanece ubicada en la esquina superior derecha de la tarjeta (`.note-header`), y la categoría permanece en el pie (`.note-footer`).
  - **Eliminación de Espacio Vacío entre Título y Descripción**:
    - En la vista de lista, `.note-title` adapta su ancho de forma estricta a la longitud de su texto (`width: auto !important; max-width: 55%; display: inline-block;`), eliminando el ancho forzado que dejaba un hueco blanco artificial para títulos cortos.
    - El separador `—` y la descripción (`.note-content-inline`) se sitúan adyacentes al título con un espaciado regular de texto (`gap: 0.35rem;`), truncándose limpiamente con puntos suspensivos (`...`) si el texto completo excede el ancho de la ventana.

---

## 2. Requisitos Funcionales

* **FR-051**: Botón conmutador de vista (`grid` vs `list`) con persistencia en `localStorage`.
* **FR-052**: Regla de exclusión mutua de categoría: pie en cuadrícula, inicio en lista; cero duplicidades.
* **FR-053**: Altura mínima de 110px para tarjetas en modo cuadrícula.
* **FR-054**: Truncado con elipsis anticolisión entre el título y la fecha límite, y en la descripción.
* **FR-055**: Posicionamiento contextual de la fecha límite: contigua a la categoría en vista lista, superior derecha en vista cuadrícula.
* **FR-056**: Flujo continuo y adyacente entre título y descripción en vista lista sin espacios intermedios fantasma.
