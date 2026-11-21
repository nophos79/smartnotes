# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.7 - Optimización de Márgenes y Exclusión de Redimensionamiento en Lista)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.7 Compact Margins & List View Resize Exclusion)  
**Input**:
1. En la vista de lista, no debe aparecer el icono para cambiar el tamaño de las fichas (`.card-resize-handle`) y, por consiguiente, tampoco el botón `#resetCardSizeBtn`.
2. En la vista de cuadrícula, reducir el margen y el espacio en blanco excesivo alrededor del contenido de las fichas.
3. En la vista de lista, reducir el espacio en blanco del borde de cada fila para lograr un diseño denso y ceñido al contenido.

---

## 1. User Story 35 - Optimización de Márgenes y Exclusión de Redimensión en Lista
Como usuario, quiero que la vista de lista prescinda del tirador de redimensión y del botón de restablecimiento de tamaño, y que tanto las fichas de cuadrícula como las filas de lista tengan márgenes y rellenos ceñidos a su contenido sin espacios en blanco desaprovechados.

* **Acceptance Criteria**:
  - **Exclusión de Redimensionamiento en Vista Lista**:
    - En `.view-list`, el tirador de arrastre `.card-resize-handle` queda oculto (`display: none !important;`).
    - En `.view-list`, el botón `#resetCardSizeBtn` permanece oculto en la barra de herramientas.
  - **Reducción de Márgenes y Relleno Blanco en Cuadrícula**:
    - Reducción del relleno perimetral de `.note-card` a `padding: 0.4rem 0.55rem 0.35rem 0.55rem;`.
    - Reducción del espaciado interno en `.note-body` (`margin: 0.15rem 0;`) y `.note-footer` (`padding-top: 0.3rem;`).
    - Ajuste de dimensiones compactas mínimas a `width: 240px` y `height: 98px` (`min-height: 96px;`), eliminando el área blanca sobrante.
  - **Reducción de Espacio Blanco del Borde en Vista Lista**:
    - Reducción del padding de la fila a `padding: 0.2rem 0.5rem !important;`.
    - Ajuste de altura de fila a `height: 36px !important; min-height: 36px !important; max-height: 40px !important;`.
    - Contenido verticalmente centrado con holgura mínima estética.

---

## 2. Requisitos Funcionales

* **FR-051**: Botón conmutador de vista (`grid` vs `list`) con persistencia en `localStorage`.
* **FR-052**: Regla de exclusión mutua de categoría: pie en cuadrícula, inicio en lista; cero duplicidades.
* **FR-053**: Altura mínima acotada para tarjetas en modo cuadrícula.
* **FR-054**: Truncado con elipsis anticolisión entre el título y la fecha límite, y en la descripción.
* **FR-055**: Posicionamiento contextual de la fecha límite: contigua a la categoría en vista lista, superior derecha en vista cuadrícula.
* **FR-056**: Flujo continuo y adyacente entre título y descripción en vista lista sin espacios intermedios fantasma.
* **FR-057**: Restablecimiento automático a dimensiones mínimas compactas al regresar a la vista de cuadrícula.
* **FR-058**: Ocultación estricta de controles de redimensión (tirador y botón restablecer) en la vista de lista.
* **FR-059**: Optimización de márgenes y eliminación de espacios en blanco perimetrales en tarjetas y filas.
