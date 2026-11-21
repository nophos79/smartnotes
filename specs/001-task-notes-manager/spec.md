# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.9 - Fecha dd/mm/aa Superior y Alto Contraste)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v5.9 Due Date dd/mm/yy Top-Right & High Contrast Icons)  
**Input**:
1. En modo oscuro los iconos de detalle, editar y borrar notas no se ven claros (faint/dim).
2. El campo fecha debe presentarse en formato `dd/mm/aa` (ej: `01/12/26`) y reubicarse arriba a la derecha en la cabecera de la nota.
3. La etiqueta de fecha debe tener colores de alto contraste que resalten con nitidez tanto en modo claro como en modo oscuro.

---

## 1. User Story 27 - Fecha en Cabecera y Máximo Contraste de Acciones
Como usuario, quiero consultar la fecha límite de un vistazo en la esquina superior derecha de la tarjeta con formato compacto `dd/mm/aa` y colores vivos de alto contraste, y que los botones de acción en modo oscuro se distingan con total nitidez sin verse apagados.

* **Acceptance Criteria**:
  - **Ubicación y Formato de Fecha**:
    - Se formatea la fecha como `dd/mm/aa` (por ejemplo, `01/12/26`).
    - Se ubica en la esquina superior derecha (`.note-header`), conviviendo armónicamente con el título y el checkbox.
    - El pie de la tarjeta queda libre en su lado izquierdo exclusivamente para la categoría (`.badge`), y en su lado derecho para los botones de acción.
  - **Paleta de Alto Contraste para la Fecha**:
    - Modo Oscuro: Fondo suave cian translúcido con texto `#38bdf8` y borde vibrante (o rojo brillante `#fca5a5` para vencidas y amarillo `#fde047` para hoy).
    - Modo Claro: Fondo azul suave `#eff6ff` con texto azul zafiro `#1d4ed8` de alto contraste y borde `#bfdbfe`.
  - **Contraste de Botones de Acción en Modo Oscuro**:
    - Fondo elevado `#1e293b` con borde nítido `#334155`.
    - Color base de icono en blanco slate `#f1f5f9` (en lugar de gris apagado `#94a3b8`) con trazo `stroke-width: 2.2px`.
    - Feedback interactivo vívido al pasar el ratón (azul cielo para detalle, violeta para editar, rojo coral para borrar).

---

## 2. Requisitos Funcionales

* **FR-039**: Formato `dd/mm/aa` y reubicación en la cabecera superior derecha de la nota.
* **FR-040**: Elevación de contraste de iconos de acción y etiqueta de fecha en temas claro y oscuro.
