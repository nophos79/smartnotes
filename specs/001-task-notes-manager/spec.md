# Feature Specification: Gestor de Tareas y Notas Inteligente (v6.0 - Identidad Cromática de Acciones e Iconos)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v6.0 Action Buttons Chromatic Identity & Modern Vector Icons)  
**Input**:
1. Poner color diferenciado a los botones de acción rápida de cada nota: detalle, editar y borrar.
2. Aclarar la discrepancia visual entre los iconos descritos en las respuestas del asistente (donde se utilizaron emojis como atajo de texto) y los iconos reales mostrados en la aplicación web (vectores SVG modernos).

---

## 1. User Story 28 - Identidad Cromática en Botones de Acción
Como usuario, quiero que los botones de detalle, editar y borrar tengan identidades de color diferenciadas tanto en modo oscuro como en modo claro, para identificarlos y pulsarlos de forma instantánea sin confusiones visuales, disfrutando de iconos vectoriales modernos y estilizados.

* **Acceptance Criteria**:
  - **Identidad Cromática Diferenciada**:
    - **Botón Detalle (`.btn-detail`)**:
      - Modo Oscuro: Fondo translúcido cian/cielo (`rgba(14, 165, 233, 0.12)`), borde `rgba(56, 189, 248, 0.35)`, icono/texto cian brillante `#38bdf8`. Hover: fondo más luminoso y borde `#38bdf8`.
      - Modo Claro: Fondo azul cielo suave `#f0f9ff`, borde `#bae6fd`, icono azul zafiro `#0284c7`. Hover: fondo `#e0f2fe` y borde `#7dd3fc`.
    - **Botón Editar (`.btn-edit`)**:
      - Modo Oscuro: Fondo translúcido ámbar/dorado (`rgba(245, 158, 11, 0.12)`), borde `rgba(245, 158, 11, 0.35)`, icono ámbar cálido `#fbbf24`. Hover: fondo ámbar aumentado y borde `#fbbf24`.
      - Modo Claro: Fondo ámbar claro `#fffbeb`, borde `#fde68a`, icono ámbar oscuro `#d97706`. Hover: fondo `#fef3c7` y borde `#fcd34d`.
    - **Botón Borrar (`.btn-delete`)**:
      - Modo Oscuro: Fondo translúcido carmesí/coral (`rgba(239, 68, 68, 0.12)`), borde `rgba(248, 113, 113, 0.35)`, icono rojo coral `#f87171`. Hover: fondo rojo intenso y borde `#f87171`.
      - Modo Claro: Fondo rosa suave `#fef2f2`, borde `#fecaca`, icono carmesí `#dc2626`. Hover: fondo `#fee2e2` y borde `#f87171`.
  - **Iconografía Vectorial Nítida (SVG)**:
    - Sin dependencia de emojis de sistema operativo.
    - Ojo geométrico moderno con pupila central nítida (15×15px).
    - Lápiz de edición con ángulo contemporáneo y punta definida (15×15px).
    - Papelera estilizada con tapa separada y guías verticales interiores (15×15px).

---

## 2. Requisitos Funcionales

* **FR-039**: Formato `dd/mm/aa` y reubicación en la cabecera superior derecha de la nota.
* **FR-040**: Elevación de contraste de iconos de acción y etiqueta de fecha en temas claro y oscuro.
* **FR-041**: Identidad cromática por tipo de acción (Cian para Detalle, Ámbar para Editar, Coral/Rojo para Borrar) tanto en estado base como en hover.
* **FR-042**: Consistencia vectorial SVG de estilo moderno en los 3 botones de acción rápida.
