# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.4 - Selector de Vista Cuadrícula/Lista y Corrección de Truncado)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.4 Grid/List View Toggle, Strict Category Mutual Exclusion & Antilapse Truncation)  
**Input**:
1. Altura mínima de las fichas de tareas cuando no están en una sola línea (modo cuadrícula) acotada a fichas compactas de 3 niveles (~110-115px).
2. Botón explícito para alternar a modo lista con una tarea por línea (vista de la foto 2) sin forzar el redimensionamiento manual.
3. Exclusión mutua de categoría: en modo cuadrícula solo aparece abajo junto a los botones; en modo lista solo aparece al inicio junto al check; en ningún caso se duplica.
4. Corrección de solapamiento en tarjetas compactas: el título no debe tapar la fecha límite y debe truncarse con puntos suspensivos (`...`), al igual que la descripción.

---

## 1. User Story 32 - Selector de Vista Cuadrícula/Lista y Truncado Anticolisión
Como usuario, quiero alternar entre la vista de cuadrícula y la vista de lista de una tarea por línea mediante un botón dedicado, asegurando que la categoría nunca se duplique en ninguna vista, y que en el tamaño más compacto de cuadrícula el título y la descripción se corten limpiamente con puntos suspensivos sin solaparse jamás con la fecha.

* **Acceptance Criteria**:
  - **Botón Selector de Vista (`#viewToggleBtn`)**:
    - Ubicado en la barra superior de acciones junto a los controles principales, permitiendo alternar entre `Vista Cuadrícula` y `Vista Lista`.
    - Persistencia del modo seleccionado (`grid` o `list`) en `localStorage`.
  - **Exclusión Mutua Estricta de Categoría**:
    - En **Modo Cuadrícula**: la categoría se muestra única y exclusivamente en el pie de la tarjeta, junto a los botones de acción rápida.
    - En **Modo Lista**: la categoría se muestra única y exclusivamente al principio de la línea, junto al checkbox.
    - En ningún caso se renderiza la categoría por duplicado.
  - **Altura Mínima en Cuadrícula (110px)**:
    - Altura mínima acotada a 110px para garantizar la perfecta legibilidad de los tres niveles: cabecera (check + título + fecha), cuerpo (descripción de 1 línea con elipsis) y pie (categoría + acciones).
  - **Truncado Anticolisión en Cabecera y Descripción**:
    - `.note-title-wrap` y `.note-title` configurados con `min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`.
    - La insignia de fecha límite (`.due-badge`) cuenta con `flex-shrink: 0;`, garantizando que el título se corte con puntos suspensivos antes de tocar la fecha.
    - La descripción en tarjetas compactas cuenta con truncado estricto multilínea acotado con puntos suspensivos, sin desbordar hacia el pie.

---

## 2. Requisitos Funcionales

* **FR-051**: Botón conmutador de vista (`grid` vs `list`) con persistencia en `localStorage`.
* **FR-052**: Regla de exclusión mutua de categoría: pie en cuadrícula, inicio en lista; cero duplicidades.
* **FR-053**: Altura mínima de 110px para tarjetas en modo cuadrícula.
* **FR-054**: Truncado con elipsis anticolisión entre el título y la fecha límite, y en la descripción.
