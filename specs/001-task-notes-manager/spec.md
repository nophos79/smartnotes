# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.3 - Modo Fila Única y Margen Optimizado)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.3 Single-Row Note Layout, Reduced Margins & Compact Text Flow)  
**Input**:
1. Reducir el margen/espaciado de las tarjetas de las notas.
2. Permitir agrandar el tamaño hasta que quede una nota por fila.
3. Si queda una nota por fila:
   - Checkbox y Categoría van al principio de la línea.
   - La descripción aparece a continuación del título.
   - En tamaño mínimo, el espacio para texto es de una sola fila para título y descripción continuos; si la altura crece, la altura máxima del texto es de una fila para el título y una fila para la descripción (máximo 2 líneas).
   - Los botones de acción rápida y el tirador van al final de la línea.

---

## 1. User Story 31 - Modo Fila Única y Margen Compacto
Como usuario, quiero reducir el espacio entre tarjetas para aprovechar mejor la pantalla y poder agrandar el ancho hasta que cada nota ocupe una fila completa en un formato horizontal compacto, donde el check y la categoría estén al inicio, el texto fluya de forma continua (título y descripción en 1 o máximo 2 líneas) y los botones de acción se ubiquen al final.

* **Acceptance Criteria**:
  - **Margen Compacto de Tarjetas**:
    - Se reduce la separación de la cuadrícula a `gap: 0.5rem` (en lugar de `1.25rem`), compactando los márgenes entre tarjetas y optimizando el espacio visual.
  - **Expansión Dinámica a Fila Única**:
    - El límite máximo de redimensión se amplía hasta 1800px para permitir ocupar toda la fila.
    - Cuando la anchura configurada hace que entre solo 1 nota por fila (`cols <= 1`), se activa automáticamente el modo `.is-single-row`.
    - La altura mínima configurable se reduce a 46px para permitir filas ultra-compactas.
  - **Estructura Horizontal de Fila Única**:
    - **Inicio:** Checkbox cuadrado seguido inmediatamente de la etiqueta de categoría (`.badge`).
    - **Centro:** Bloque de texto con el título seguido de la descripción (`—`).
      - En altura mínima (≤ 58px): título y descripción continuos en una sola fila (`nowrap` con elipsis).
      - En altura mayor (> 58px): máximo 1 fila para el título y 1 fila para la descripción (máximo 2 líneas acotadas).
    - **Final:** Insignia de fecha límite (`dd/mm/aa`) y botones de acción rápida (`Detalle`, `Editar`, `Borrar`) con el tirador de redimensión.

---

## 2. Requisitos Funcionales

* **FR-047**: Reducción del espaciado de cuadrícula (`gap: 0.5rem`) y optimización de márgenes entre tarjetas.
* **FR-048**: Expansión del rango de redimensión (anchura hasta 1800px y altura mínima 46px) con detección dinámica de 1 nota por fila (`.is-single-row`).
* **FR-049**: Disposición horizontal en modo fila única: Checkbox y Categoría al principio, Fecha y Acciones al final.
* **FR-050**: Flujo de texto continuo en modo fila única: título y descripción en 1 fila (tamaño mínimo) o a lo sumo 1 fila para título y 1 fila para descripción (en altura multilínea acotada a 2 líneas).
