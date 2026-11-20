# Feature Specification: Gestor de Tareas y Notas Inteligente (v2 - Expansión)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v2 Expansion)  
**Input**: Ampliación de capacidades clave solicitadas por el usuario:
1. Edición de notas existentes.
2. Fechas límite (Due Dates) con avisos de vencimiento.
3. Ordenación dinámica (por fecha, alfabético, urgencia, fecha límite).
4. Categorías personalizadas con selector de color.
5. Modo Claro / Modo Oscuro con persistencia.
6. Exportación e Importación de copias de seguridad en JSON.

---

## 1. User Scenarios & Testing *(Nuevas Historias de Usuario)*

### User Story 4 - Edición de notas existentes (Priority: P1)
Como usuario, quiero hacer clic en un botón de editar en una nota para corregir su título, descripción, categoría o fecha límite sin perder su estado.
* **Acceptance Criteria**:
  - Al pulsar "Editar", se abre un formulario pre-rellenado con los datos actuales.
  - Al guardar los cambios, la tarjeta se actualiza en el listado y en el almacenamiento local.

### User Story 5 - Fechas límite y detección de tareas vencidas (Priority: P1)
Como usuario, quiero asignar una fecha límite opcional a una tarea para saber cuándo vence y ver una alerta visual si está próxima a vencer o atrasada.
* **Acceptance Criteria**:
  - Cada nota puede tener un campo opcional `due_date`.
  - Si la fecha límite ya pasó y la tarea no está completada, se muestra una insignia roja de "Vencida".

### User Story 6 - Ordenación flexible (Priority: P2)
Como usuario, quiero ordenar mis notas por diferentes criterios (Más recientes, Más antiguas, Alfabético A-Z, Urgencia o Fecha Límite).
* **Acceptance Criteria**:
  - Un desplegable de ordenación permite cambiar el orden de las notas al instante en pantalla.

### User Story 7 - Categorías personalizadas (Priority: P2)
Como usuario, quiero añadir nuevas categorías con nombre y color personalizado para adaptarlo a mis proyectos propios.
* **Acceptance Criteria**:
  - Botón "Gestionar Categorías" que permite añadir una nueva categoría con selector de color.
  - La nueva categoría aparece inmediatamente en el formulario y en la barra de filtros.

### User Story 8 - Tema Claro y Oscuro (Priority: P3)
Como usuario, quiero alternar entre tema oscuro y claro mediante un botón en la cabecera.
* **Acceptance Criteria**:
  - Botón de alternancia de tema (☀️ / 🌙) en la esquina superior derecha.
  - El tema preferido se guarda en `localStorage` y se recuerda en futuras sesiones.

### User Story 9 - Exportación e Importación de Copias de Seguridad (Priority: P3)
Como usuario, quiero exportar todas mis notas a un archivo `.json` y poder importar un archivo de respaldo cuando lo necesite.
* **Acceptance Criteria**:
  - Botón "Exportar JSON" que descarga automáticamente un archivo con la fecha del día.
  - Botón "Importar JSON" con selector de archivo que valida y restaura las notas.

---

## 2. Nuevos Requisitos Funcionales

* **FR-006**: Sistema de edición en modal con soporte para actualizar todos los campos de una nota.
* **FR-007**: Asignación de fecha límite `due_date` y cálculo de estados: `En plazo`, `Vence hoy`, `Vencida`.
* **FR-008**: Motor de ordenación multi-criterio.
* **FR-009**: Almacén y gestor de categorías dinámicas en persistencia local.
* **FR-010**: Selector de tema Claro / Oscuro con variables CSS adaptativas.
* **FR-011**: Mecanismo de exportación e importación en formato JSON con validación de esquema.
