# Feature Specification: Gestor de Tareas y Notas Inteligente (v5.8 - Tooltips Modernos e Iconografía Refinada)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v5.8 Modern Floating Tooltips & Refined Icons)  
**Input**:
1. El aspecto visual de las ayudas de burbuja nativas del navegador resulta muy antiguo, implementar una alternativa moderna y estilizada.
2. Los botones detalle, editar y borrar lucen mejor enmarcados, pero requieren iconos vectoriales más modernos y limpios.

---

## 1. User Story 26 - Tooltips Flotantes Modernos e Iconos Refinados
Como usuario, quiero que las ayudas contextuales al pasar el ratón se muestren en cápsulas flotantes modernas y elegantes (estilo Linear/Vercel) en lugar de las burbujas nativas del sistema operativo, y que los botones de detalle, edición y borrado cuenten con iconos vectoriales de última generación.

* **Acceptance Criteria**:
  - **Sistema de Tooltips Modernos**:
    - Se interceptan de forma global las etiquetas descriptivas (`title` y `data-tooltip`) para silenciar por completo los tooltips nativos del navegador.
    - Se muestra una cápsula flotante con fondo Slate oscuro (`#0f172a`), tipografía fina (`font-size: 0.76rem`), sutil sombra de elevación y animación suave de aparición (`scale(0.96) -> scale(1)` y `opacity`).
    - Posicionamiento inteligente sobre el elemento con detección de bordes de la pantalla.
  - **Iconografía de Última Generación**:
    - **Detalle**: Icono vectorial de ojo moderno con curva estilizada y pupila centrada.
    - **Editar**: Icono vectorial de pluma moderna angulada con trazo de punta separada (estilo Linear/Notion).
    - **Eliminar**: Icono vectorial de papelera moderna con tapa flotante y doble ranura vertical (`trash-2`).
    - Botones enmarcados con dimensiones optimizadas a 30×30px y `border-radius: 8px`.

---

## 2. Requisitos Funcionales

* **FR-037**: Sistema integral de tooltips flotantes (`#appTooltip`) con delegación global de eventos y anulación del `title` nativo.
* **FR-038**: Conjunto de iconos vectoriales SVG de estética contemporánea para acciones de tarjeta.
