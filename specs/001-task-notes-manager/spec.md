# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.5 - Redimensionamiento de Notas y Legibilidad)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v5.5 Drag-to-Resize & Typographic Legibility)  
**Input**:
1. La lupa sigue tapando parte del texto "Buscar notas..." debido a sobreescritura de cascada CSS.
2. Permitir que el tamaño de las notas se pueda cambiar pinchando con el ratón y arrastrando, de forma que cambiando una, todas se cambien a ese nuevo estándar.
3. El tamaño del texto en general puede resultar pequeño en algunos casos, mejorar legibilidad e incorporar control de escala tipográfica.

---

## 1. User Story 22 - Redimensionamiento Interactivo de Tarjetas Sincronizado
Como usuario, quiero poder hacer clic y arrastrar desde la esquina de cualquier nota para cambiar su tamaño (ancho mínimo y alto), de manera que todas las notas adopten inmediatamente esas nuevas dimensiones estándar y se recuerde mi preferencia.

* **Acceptance Criteria**:
  - Cada tarjeta dispone de un tirador de arrastre (*resize handle*) discreto y accesible en su esquina inferior derecha (`cursor: nwse-resize`).
  - Al arrastrar el tirador con el ratón, se recalculan el ancho mínimo y la altura estándar en tiempo real mediante variables CSS (`--card-min-width`, `--card-height`).
  - Todas las notas de la cuadrícula se redimensionan simultáneamente y de forma sincronizada.
  - Al soltar el ratón, el nuevo estándar se almacena en `localStorage` (`speckit_card_size_v1`).
  - Se incluye un botón de restablecer tamaño predeterminado cuando las dimensiones difieren de las estándar (290px × 240px).

---

## 2. User Story 23 - Escalado Tipográfico y Legibilidad Global
Como usuario con pantallas de alta resolución o necesidad de mayor tamaño de texto, quiero que las notas y elementos clave tengan tamaños de fuente generosos y poder ajustar la escala general fácilmente.

* **Acceptance Criteria**:
  - Aumento de tamaños base tipográficos: títulos a `1.08rem`, cuerpo de texto a `0.94rem` con interlineado holgado `1.55`.
  - Control de escala tipográfica accesible en la barra superior / sidebar con opciones: Normal (100%), Grande (112%), Muy Grande (125%).
  - La escala se aplica mediante `--text-scale` a nivel de raíz (`html { font-size: calc(16px * var(--text-scale)); }`) escalando armoniosamente toda la UI.
  - Se guarda la preferencia en `localStorage` (`speckit_text_scale_v1`).

---

## 3. Requisitos Funcionales

* **FR-031**: Especificidad CSS garantizada (`.search-box input[type="text"]` con `padding-left: 3.1rem !important`) para asegurar que la lupa vectorial nunca se solape con el texto ni con el placeholder.
* **FR-032**: Componente interactivo de redimensionamiento de tarjetas con eventos de puntero (`pointerdown`, `pointermove`, `pointerup`) y persistencia.
* **FR-033**: Selector de escala de texto y aumento de fuentes base para optimización de accesibilidad visual.
