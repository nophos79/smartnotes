# Feature Specification: Gestor de Tareas y Notas Inteligente (v4.2 - Tarjetas Uniformes & Modal Detalle)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v4.2 Standard Uniform Cards & Detail Modal)  
**Input**: Rejilla con tarjetas de tamaño estándar homogéneo (todas miden exactamente lo mismo para máxima simetría visual), texto cortado con puntos suspensivos y botón "Detalle" para consultar la nota completa en un visor dedicado.

---

## 1. User Story 16 - Cuadrícula Homogénea Simétrica y Visor de Detalle
Como usuario con muchas notas, quiero que todas las tarjetas tengan un tamaño estándar uniforme idéntico, formando un tablero perfectamente alineado, con el contenido recortado y un botón para abrir el detalle completo cuando quiera leerlo.

* **Acceptance Criteria**:
  - Todas las tarjetas tienen exactamente la misma altura fija estándar (230px), manteniendo una cuadrícula regular y simétrica.
  - El texto del cuerpo se trunca automáticamente con elipsis (`...`) si excede el espacio reservado.
  - Cada tarjeta incluye un botón **`👁️ Detalle`** (o clic para ver detalle) que abre un modal con la nota completa, su categoría, fecha de creación y estado.

---

## 2. Requisitos Funcionales

* **FR-020**: Tamaño fijo estandarizado (`height: 230px`) en `.note-card` con distribución interna homogénea (cabecera, cuerpo y pie fijos).
* **FR-021**: Modal de detalle (`#detailModal`) con vista de lectura completa, formateo de párrafos y acceso rápido a edición.
