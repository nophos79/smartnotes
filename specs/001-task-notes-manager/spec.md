# Feature Specification: Gestor de Tareas y Notas Inteligente (v7.0 - Arquitectura Híbrida Segura: SmartNotes.html y notas.json)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-21  
**Status**: Completed (v7.0 Autonomous SmartNotes.html Executable with Cloud-Synced notas.json & Anti-Corruption Design)  
**Input**:
1. Implementar la arquitectura híbrida acordada: un ejecutable autónomo `SmartNotes.html` (código y estilos autocontenidos en modo solo lectura para evitar cualquier corrupción) que guarda las notas en un archivo independiente `notas.json` situado en la carpeta sincronizada de Google Drive o OneDrive.
2. Persistencia del enlace con el archivo `notas.json` en IndexedDB para reconexión instantánea entre sesiones.
3. Doble capa de persistencia activa: guardado en tiempo real en `notas.json` respaldado en la nube junto a una réplica de seguridad en `localStorage`.

---

## 1. User Story 36 - Arquitectura Híbrida Segura (SmartNotes.html + notas.json)
Como usuario, quiero disponer de un único archivo ejecutable `SmartNotes.html` que pueda abrir desde cualquier ubicación (como mi Google Drive o OneDrive) sin riesgo de que el código se corrompa, y que guarde mis notas en un archivo de datos limpio `notas.json` sincronizado en la nube con reconexión persistente.

* **Acceptance Criteria**:
  - **Ejecutable Autónomo `SmartNotes.html`**:
    - Archivo único e independiente que integra `HTML`, `CSS` y `JS` en un solo documento ejecutable con doble clic en cualquier navegador.
    - Modo de ejecución de solo lectura para el código base: la aplicación nunca se auto-modifica ni sobreescribe su propia estructura, garantizando un riesgo 0 de corrupción.
  - **Sincronización Transparente con `notas.json`**:
    - El widget de sincronización permite conectar o crear `notas.json` (o cualquier archivo `.json`) en una carpeta sincronizada (Google Drive / OneDrive / disco local).
    - Cada creación, edición, cambio de estado, eliminación o creación de categorías escribe de inmediato en `notas.json`.
  - **Persistencia de Handle en IndexedDB (Reconexión Instantánea)**:
    - El `FileSystemFileHandle` se almacena en IndexedDB (`SmartNotesFS`).
    - Al abrir `SmartNotes.html` en sesiones posteriores, la aplicación detecta el archivo vinculado previamente y restaura la conexión de forma automática o mediante un solo clic de confirmación de permisos.
  - **Doble Capa de Seguridad**:
    - Mantiene sincronizado tanto el archivo físico `notas.json` como el almacenamiento en `localStorage`, garantizando que las notas sigan disponibles incluso si se abre la app temporalmente sin permisos de archivo.

---

## 2. Requisitos Funcionales

* **FR-051**: Botón conmutador de vista (`grid` vs `list`) con persistencia en `localStorage`.
* **FR-052**: Regla de exclusión mutua de categoría: pie en cuadrícula, inicio en lista; cero duplicidades.
* **FR-053**: Altura mínima acotada para tarjetas en modo cuadrícula.
* **FR-054**: Truncado con elipsis anticolisión entre el título y la fecha límite, y en la descripción.
* **FR-055**: Posicionamiento contextual de la fecha límite: contigua a la categoría en vista lista, superior derecha en vista cuadrícula.
* **FR-056**: Flujo continuo y adyacente entre título y descripción en vista lista sin espacios intermedios fantasma.
* **FR-057**: Restablecimiento automático a dimensiones mínimas compactas al regresar a la vista de cuadrícula.
* **FR-058**: Ocultación estricta de controles de redimensión (tirador y botón restablecer) en la vista de lista.
* **FR-059**: Optimización de márgenes y eliminación de espacios en blanco perimetrales en tarjetas y filas.
* **FR-060**: Compilación y mantenimiento del ejecutable autocontenido `SmartNotes.html` (CSS + JS integrados en solo lectura).
* **FR-061**: Persistencia del `FileSystemFileHandle` en IndexedDB para reconexión ágil con `notas.json`.
* **FR-062**: Doble capa de persistencia activa (`notas.json` sincronizado en la nube + réplica en `localStorage`).
