# Feature Specification: Gestor de Tareas y Notas Inteligente (v5 - Sincronización con OneDrive / Archivo Físico)

**Feature Branch**: `001-task-notes-manager`  
**Created**: 2026-11-20 | **Updated**: 2026-11-20  
**Status**: In Progress (v5 Cloud Folder & File Sync)  
**Input**: Conectar la aplicación con un archivo físico alojado en una carpeta sincronizada (ej: OneDrive, Google Drive o cualquier carpeta del disco) mediante la File System Access API nativa. De este modo, los cambios se guardan directamente en el disco duro, se comparten entre navegadores y se sincronizan automáticamente con la nube para estar disponibles desde el móvil.

---

## 1. User Story 17 - Conexión con Archivo Sincronizado en OneDrive
Como usuario que utiliza múltiples navegadores y quiere consultar sus notas desde el móvil, quiero conectar la aplicación a un archivo `.json` guardado en mi carpeta de OneDrive, para que cada cambio se guarde en tiempo real en mi disco y se suba a la nube automáticamente sin configurar servidores.

* **Acceptance Criteria**:
  - En el Sidebar hay un botón **`📁 Conectar Archivo / OneDrive`**.
  - Al pulsarlo, el usuario puede seleccionar un archivo existente o crear uno nuevo (`smartnotes.json`) en su carpeta de OneDrive.
  - Al conectarse, la aplicación carga automáticamente las notas de ese archivo.
  - Cada vez que se crea, edita, completa o elimina una nota, la aplicación escribe automáticamente en el archivo físico en segundo plano.
  - Un indicador visual en el Sidebar muestra el estado: **`🟢 Sincronizado con [nombre-archivo]`**.
  - Si no hay archivo conectado o el navegador no lo soporta, la app sigue funcionando con `localStorage` sin interrupciones.

---

## 2. Requisitos Funcionales

* **FR-022**: Implementar `FileSystemService` utilizando `window.showOpenFilePicker` y `window.showSaveFilePicker`.
* **FR-023**: Guardado atómico formateado (JSON legible con 2 espacios) tras cualquier mutación del estado.
* **FR-024**: Indicador de estado y botón de desconexión / cambio de archivo en la interfaz.
