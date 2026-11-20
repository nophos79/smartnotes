# Feature Specification: Gestor de Tareas y Notas Inteligente (v4.1 - Altura Independiente de Tarjetas)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v4.1 Card Height Decoupling)  
**Input**: Evitar que todas las tarjetas de notas de una fila se estiren artificialmente para igualar a la nota con más texto.

---

## 1. User Story 15 - Altura Natural e Independiente por Tarjeta
Como usuario, quiero que cada tarjeta de nota ocupe únicamente el espacio vertical que necesita su propio contenido, sin que una nota larga deforme o alargue las tarjetas vecinas en la misma fila.

* **Acceptance Criteria**:
  - Las tarjetas en la rejilla tienen alineación independiente (`align-items: start`), de modo que una nota extensa no fuerza a las demás a estirarse.
  - El texto largo cuenta con un truncado visual elegante (`line-clamp: 5`) para notas muy extensas, manteniendo la cuadrícula limpia y ordenada.

---

## 2. Requisitos Funcionales

* **FR-019**: Rejilla CSS con `align-items: start` y `align-self: start` en las tarjetas, junto con `overflow: hidden` y `text-overflow: ellipsis` multi-línea.
