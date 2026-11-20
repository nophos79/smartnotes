# Feature Specification: Gestor de Tareas y Notas Inteligente

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20  
**Status**: Draft  
**Input**: Opción A: Gestor de Tareas y Notas con categorías (Urgente, Trabajo, Personal), filtros y búsqueda en tiempo real.

---

## 1. User Scenarios & Testing *(Prioritized User Journeys)*

### User Story 1 - Creación y visualización rápida de notas (Priority: P1)
Como usuario, quiero crear notas con un título, contenido y una categoría para tener organizados mis pendientes diarios de forma inmediata.

* **Why this priority**: Es la funcionalidad nuclear del producto (MVP). Sin poder crear ni ver notas, el resto del sistema no tiene sentido.
* **Independent Test**: Se puede probar creando una nota con título "Reunión de equipo", categoría "Trabajo" y verificando que aparece en el listado principal inmediatamente.
* **Acceptance Scenarios**:
  1. **Given** que el usuario está en la vista principal, **When** escribe título, contenido y selecciona categoría "Trabajo" y pulsa "Guardar", **Then** la nota aparece en el listado y los campos de entrada se limpian.
  2. **Given** que el usuario intenta guardar una nota con el título vacío, **When** pulsa "Guardar", **Then** el sistema muestra una advertencia visual y no crea la nota.

---

### User Story 2 - Filtrado por Categorías y Búsqueda en tiempo real (Priority: P2)
Como usuario, quiero filtrar las notas por categoría (Urgente, Trabajo, Personal) y buscar por texto para encontrar rápidamente una nota específica.

* **Why this priority**: Permite que la aplicación sea realmente útil cuando el volumen de notas crece.
* **Independent Test**: Con 5 notas creadas de diferentes categorías, hacer clic en "Urgente" y comprobar que solo se muestran las notas marcadas como urgentes.
* **Acceptance Scenarios**:
  1. **Given** un listado con notas variadas, **When** el usuario hace clic en el filtro "Urgente", **Then** solo se muestran las notas con dicha categoría.
  2. **Given** un listado de notas, **When** el usuario teclea "presupuesto" en la barra de búsqueda, **Then** el listado se filtra reactivamente mostrando solo notas que contengan esa palabra en el título o contenido.

---

### User Story 3 - Completar y eliminar tareas (Priority: P3)
Como usuario, quiero marcar una tarea como completada o eliminarla cuando ya no sea relevante.

* **Why this priority**: Cierra el ciclo de vida de una tarea/nota.
* **Independent Test**: Marcar el checkbox de una tarea y verificar que cambia visualmente (tachada/atenuada) y el contador de pendientes se actualiza.
* **Acceptance Scenarios**:
  1. **Given** una tarea pendiente, **When** el usuario marca el checkbox, **Then** la tarea se tacha visualmente y su estado cambia a "Completada".
  2. **Given** cualquier nota, **When** el usuario pulsa el botón de eliminar, **Then** la nota desaparece del listado tras una confirmación visual.

---

## 2. Requirements

### Functional Requirements
* **FR-001**: El sistema DEBE permitir crear notas con `título` (obligatorio), `contenido` (opcional), `categoría` (Trabajo, Personal, Urgente, General) y `estado` (Pendiente, Completada).
* **FR-002**: El sistema DEBE persistir las notas en almacenamiento local (o base de datos ligera SQLite/JSON) para no perder datos al reiniciar.
* **FR-003**: El sistema DEBE ofrecer una barra de búsqueda reactiva instantánea por texto.
* **FR-004**: El sistema DEBE permitir filtrar por botones de categoría (Todas, Urgente, Trabajo, Personal).
* **FR-005**: El sistema DEBE calcular automáticamente métricas en tiempo real: total de notas, pendientes y completadas.

### Key Entities
* **Nota/Tarea**:
  * `id`: Identificador único (UUID o autoincremental).
  * `title`: Texto corto representativo.
  * `content`: Texto descriptivo detallado.
  * `category`: Categoría asignada (`Urgente`, `Trabajo`, `Personal`, `General`).
  * `is_completed`: Booleano (true/false).
  * `created_at`: Fecha y hora de creación.

---

## 3. Success Criteria

* **SC-001**: El usuario puede crear una nota en menos de 5 segundos.
* **SC-002**: El filtrado por texto o categoría responde de forma inmediata (< 50ms).
* **SC-003**: Ningún dato se pierde al recargar o reiniciar la aplicación.
