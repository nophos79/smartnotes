# Feature Specification: Gestor de Tareas y Notas Inteligente (v3.1 - Gestión de Categorías)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v3.1 Category Management)  
**Input**: Añadir capacidad de listar y eliminar categorías existentes desde el modal de gestión de categorías.

---

## 1. User Story 13 - Gestión y Eliminación de Categorías (Priority: P1)
Como usuario, quiero ver la lista de todas las categorías existentes y poder eliminar las que ya no use con un botón de papelera.
* **Acceptance Criteria**:
  - El modal `🏷️ Gestión de Categorías` muestra la lista de categorías actuales con su muestra de color y nombre.
  - Cada categoría tiene un botón `🗑️` para eliminarla.
  - Al eliminar una categoría, si existen notas asociadas a ella, se reasignan automáticamente a "General" para no romper el sistema.
  - Si el filtro activo era la categoría eliminada, se restablece a "Todas".

---

## 2. Requisitos Funcionales

* **FR-015**: Módulo de administración de categorías con soporte para eliminar categorías y migración de notas existentes.
