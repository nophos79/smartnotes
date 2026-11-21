# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.6 - Restablecimiento Automático de Tamaño Mínimo en Cuadrícula)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.6 Grid View Auto-Reset to Compact Minimum Dimensions)  
**Input**:
1. Al volver a la vista cuadrícula desde la vista de lista, las tarjetas deben volver a tener automáticamente el tamaño mínimo ya decidido para esa visualización (fichas compactas de 3 niveles: 110px de altura y 250px de ancho).
2. Actualización de las constantes de tamaño por defecto del sistema a la geometría mínima compacta (110px de alto), migrando valores obsoletos de versiones anteriores.

---

## 1. User Story 34 - Restablecimiento Automático del Tamaño Mínimo en Vista Cuadrícula
Como usuario, cuando cambio de la vista de lista a la vista de cuadrícula, quiero que las fichas vuelvan a adoptar de forma inmediata el tamaño mínimo compacto establecido para esa visualización (110px de altura y 250px de ancho), evitando que se muestren con dimensiones sobredimensionadas.

* **Acceptance Criteria**:
  - **Restablecimiento Inmediato al Conmutar a Cuadrícula**:
    - Al pulsar el conmutador de vista (`#viewToggleBtn`) para regresar a la vista de cuadrícula (`viewMode === 'grid'`), el sistema aplica automáticamente el tamaño mínimo decidido: `GRID_MIN_CARD_SIZE = { width: 250, height: 110 }`.
    - Las propiedades CSS `--card-min-width` y `--card-height` se actualizan a `250px` y `110px` respectivamente.
    - El tamaño se sincroniza en `localStorage` (`speckit_card_size_v1`), manteniendo la coherencia entre recargas.
  - **Definición de Tamaño Base Compacto**:
    - El tamaño por defecto `DEFAULT_CARD_SIZE` pasa de los antiguos 240px a los `110px` de altura actuales (y `250px` de ancho mínimo), garantizando que las nuevas sesiones y los restablecimientos manuales muestren siempre la ficha compacta de 3 niveles.
    - En `src/styles.css`, `.note-card` fija `min-height: 110px;` y `height: var(--card-height, 110px);`.

---

## 2. Requisitos Funcionales

* **FR-051**: Botón conmutador de vista (`grid` vs `list`) con persistencia en `localStorage`.
* **FR-052**: Regla de exclusión mutua de categoría: pie en cuadrícula, inicio en lista; cero duplicidades.
* **FR-053**: Altura mínima de 110px para tarjetas en modo cuadrícula.
* **FR-054**: Truncado con elipsis anticolisión entre el título y la fecha límite, y en la descripción.
* **FR-055**: Posicionamiento contextual de la fecha límite: contigua a la categoría en vista lista, superior derecha en vista cuadrícula.
* **FR-056**: Flujo continuo y adyacente entre título y descripción en vista lista sin espacios intermedios fantasma.
* **FR-057**: Restablecimiento automático a dimensiones mínimas compactas (250×110px) al regresar a la vista de cuadrícula.
