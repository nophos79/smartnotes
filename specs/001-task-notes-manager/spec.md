# Feature Specification: Gestor de Tareas y Notas Inteligente (v5 - Sincronización con Archivo Físico / Carpeta Sincronizada)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: Completed (v5 Cloud Folder & File Sync)  
**Input**: Conectar la aplicación con un archivo físico alojado en una carpeta sincronizada o en el disco mediante la File System Access API nativa. Los cambios se guardan directamente en el disco duro, se comparten entre navegadores y se sincronizan automáticamente si la carpeta está vinculada a un servicio en la nube.

---

## 1. User Story 17 - Conexión con Archivo Sincronizado
Como usuario que utiliza múltiples navegadores o dispositivos, quiero conectar la aplicación a un archivo `.json` guardado en una carpeta elegida en mi disco, para que cada cambio se guarde en tiempo real físicamente.

* **Acceptance Criteria**:
  - En el Sidebar hay un botón **`📁 Conectar Archivo`**.
  - Al pulsarlo, el usuario puede seleccionar un archivo existente o crear uno nuevo (`smartnotes.json`) en la carpeta que elija.
  - Al conectarse, la aplicación carga automáticamente las notas de ese archivo.
  - Cada vez que se crea, edita, completa o elimina una nota, la aplicación escribe automáticamente en el archivo físico en segundo plano.
  - Un indicador visual en el Sidebar muestra el estado: **`🟢 Archivo Vinculado: [nombre-archivo]`**.
  - Si no hay archivo conectado, la app sigue funcionando con `localStorage` sin interrupciones.

---

## 2. Requisitos Funcionales

* **FR-022**: Implementar `FileSystemService` utilizando `window.showOpenFilePicker` y `window.showSaveFilePicker`.
* **FR-023**: Guardado atómico formateado (JSON legible con 2 espacios) tras cualquier mutación del estado.
* **FR-024**: Indicador de estado y botón de desconexión / cambio de archivo en la interfaz.
