/**
 * SmartNotes - Spec-Driven Development (v8.0)
 * Almacenamiento exclusivo en carpeta física (Google Drive / OneDrive / Disco Local)
 * con archivo notas.json automático. Cero persistencia de notas en el navegador.
 */

const STORAGE_KEY_THEME = 'speckit_theme_v1';
const STORAGE_KEY_CARD_SIZE = 'speckit_card_size_v1';
const STORAGE_KEY_TEXT_SCALE = 'speckit_text_scale_v1';
const STORAGE_KEY_VIEW_MODE = 'speckit_view_mode_v1';

const GRID_MIN_CARD_SIZE = { width: 240, height: 98 };
const DEFAULT_CARD_SIZE = { width: 240, height: 98 };

const DEFAULT_CATEGORIES = [
  { id: 'trabajo', name: 'Trabajo', color: '#38bdf8' },
  { id: 'urgente', name: 'Urgente', color: '#f87171' },
  { id: 'personal', name: 'Personal', color: '#34d399' },
  { id: 'general', name: 'General', color: '#c084fc' }
];

const INITIAL_SEED_NOTES = [
  {
    id: 'seed-01',
    title: 'Definir especificaciones con Spec Kit',
    content: 'Revisar la metodología SDD y estructurar el proyecto en fases: spec, plan, tasks e implement.',
    category: 'Trabajo',
    due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    is_completed: true,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'seed-02',
    title: 'Revisar entrega de arquitectura',
    content: 'Validar criterios de aceptación SC-001 a SC-003 antes de pasar a producción.',
    category: 'Urgente',
    due_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    is_completed: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'seed-03',
    title: 'Comprar café y organizar el escritorio',
    content: 'Despejar el espacio de trabajo para la sesión de desarrollo.',
    category: 'Personal',
    due_date: '',
    is_completed: false,
    created_at: new Date(Date.now() - 3600000).toISOString()
  }
];

class StorageService {
  static getTheme() {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  }

  static setTheme(theme) {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }

  static loadCardSize() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CARD_SIZE);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.width && parsed.height) {
          if (parsed.height === 240) return { ...DEFAULT_CARD_SIZE };
          return parsed;
        }
      }
    } catch {}
    return { ...DEFAULT_CARD_SIZE };
  }

  static saveCardSize(size) {
    localStorage.setItem(STORAGE_KEY_CARD_SIZE, JSON.stringify(size));
  }

  static resetCardSize() {
    localStorage.removeItem(STORAGE_KEY_CARD_SIZE);
  }

  static loadTextScale() {
    return localStorage.getItem(STORAGE_KEY_TEXT_SCALE) || '1';
  }

  static saveTextScale(scale) {
    localStorage.setItem(STORAGE_KEY_TEXT_SCALE, scale);
  }

  static loadViewMode() {
    return localStorage.getItem(STORAGE_KEY_VIEW_MODE) || 'grid';
  }

  static saveViewMode(mode) {
    localStorage.setItem(STORAGE_KEY_VIEW_MODE, mode);
  }
}

// --- IndexedDB Helper para Persistencia del Directorio de Notas ---
const IDB_FS_NAME = 'SmartNotesFS';
const IDB_FS_STORE = 'handles';
const IDB_FS_KEY = 'activeDirHandle';

function openFSDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB no soportado'));
    try {
      const req = indexedDB.open(IDB_FS_NAME, 1);
      req.onupgradeneeded = () => {
        try {
          req.result.createObjectStore(IDB_FS_STORE);
        } catch (e) {}
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('Error IDB'));
      req.onblocked = () => reject(new Error('IDB bloqueado'));
    } catch (err) {
      reject(err);
    }
  });
}

async function saveStoredDirHandle(handle) {
  try {
    const db = await Promise.race([
      openFSDB(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout IDB')), 800))
    ]);
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_FS_STORE, 'readwrite');
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
        tx.onabort = () => resolve(false);
        tx.objectStore(IDB_FS_STORE).put(handle, IDB_FS_KEY);
      } catch (e) {
        resolve(false);
      }
    });
  } catch (e) {
    console.warn('No se pudo guardar dirHandle en IDB:', e);
    return false;
  }
}

async function getStoredDirHandle() {
  try {
    const db = await Promise.race([
      openFSDB(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout IDB')), 800))
    ]);
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_FS_STORE, 'readonly');
        tx.onerror = () => resolve(null);
        tx.onabort = () => resolve(null);
        const req = tx.objectStore(IDB_FS_STORE).get(IDB_FS_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  } catch (e) {
    return null;
  }
}

async function removeStoredDirHandle() {
  try {
    const db = await Promise.race([
      openFSDB(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout IDB')), 800))
    ]);
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_FS_STORE, 'readwrite');
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
        tx.onabort = () => resolve(false);
        tx.objectStore(IDB_FS_STORE).delete(IDB_FS_KEY);
      } catch (e) {
        resolve(false);
      }
    });
  } catch (e) {
    return false;
  }
}

// --- Aplicación Principal ---
class NotesApp {
  constructor() {
    // Limpieza estricta: cero notas o categorías en localStorage
    try {
      localStorage.removeItem('speckit_notes_data_v1');
      localStorage.removeItem('speckit_categories_v1');
    } catch {}

    this.notes = [];
    this.categories = [...DEFAULT_CATEGORIES];
    this.activeCategoryFilter = 'all'; // all o nombre de la categoría
    this.statusFilter = 'all'; // all, pending, completed, overdue
    this.searchQuery = '';
    this.currentSort = 'newest';
    this.cardSize = StorageService.loadCardSize();
    this.textScale = StorageService.loadTextScale();
    this.viewMode = StorageService.loadViewMode();
    this.dirHandle = null;
    this.pendingDirHandle = null;

    this.cacheElements();
    this.initTheme();
    this.initCardSizeAndTextScale();
    this.initViewMode();
    this.populateCategoryOptions();
    this.renderSidebarCategories();
    this.bindEvents();
    this.initTooltips();
    this.render();
    this.initFolderStorage();
  }

  cacheElements() {
    // Sidebar & Layout
    this.sidebar = document.getElementById('sidebar');
    this.sidebarBackdrop = document.getElementById('sidebarBackdrop');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileCloseSidebarBtn = document.getElementById('mobileCloseSidebarBtn');
    this.sidebarCategoryList = document.getElementById('sidebarCategoryList');
    this.navItems = document.querySelectorAll('.nav-item');

    // Contenido Principal
    this.notesGrid = document.getElementById('notesGrid');
    this.newNoteSection = document.getElementById('newNoteSection');
    this.toggleFormBtn = document.getElementById('toggleFormBtn');
    this.toggleFormBtnText = document.getElementById('toggleFormBtnText');
    this.closeFormBtn = document.getElementById('closeFormBtn');
    this.newNoteForm = document.getElementById('newNoteForm');
    this.noteTitleInput = document.getElementById('noteTitle');
    this.noteContentInput = document.getElementById('noteContent');
    this.noteCategorySelect = document.getElementById('noteCategory');
    this.noteDueDateInput = document.getElementById('noteDueDate');
    this.searchInput = document.getElementById('searchInput');
    this.sortSelect = document.getElementById('sortSelect');
    this.textSizeSelect = document.getElementById('textSizeSelect');
    this.resetCardSizeBtn = document.getElementById('resetCardSizeBtn');
    this.viewToggleBtn = document.getElementById('viewToggleBtn');
    this.viewIconList = document.getElementById('viewIconList');
    this.viewIconGrid = document.getElementById('viewIconGrid');
    this.viewToggleLabel = document.getElementById('viewToggleLabel');
    this.currentFilterTitle = document.getElementById('currentFilterTitle');
    this.currentFilterCount = document.getElementById('currentFilterCount');

    // Métricas
    this.totalNotesEl = document.getElementById('totalNotes');
    this.pendingNotesEl = document.getElementById('pendingNotes');
    this.completedNotesEl = document.getElementById('completedNotes');
    this.overdueNotesEl = document.getElementById('overdueNotes');

    // Tema
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.themeIcon = document.getElementById('themeIcon');
    this.themeLabel = document.getElementById('themeLabel');

    // Modal Detalle
    this.detailModal = document.getElementById('detailModal');
    this.detailTitle = document.getElementById('detailTitle');
    this.detailMetaRow = document.getElementById('detailMetaRow');
    this.detailContent = document.getElementById('detailContent');
    this.detailCreatedAt = document.getElementById('detailCreatedAt');
    this.closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
    this.closeDetailBtn = document.getElementById('closeDetailBtn');
    this.editFromDetailBtn = document.getElementById('editFromDetailBtn');
    this.currentDetailNoteId = null;

    // Modales Editar y Categoría
    this.editModal = document.getElementById('editModal');
    this.editNoteForm = document.getElementById('editNoteForm');
    this.editNoteId = document.getElementById('editNoteId');
    this.editNoteTitle = document.getElementById('editNoteTitle');
    this.editNoteContent = document.getElementById('editNoteContent');
    this.editNoteCategory = document.getElementById('editNoteCategory');
    this.editNoteDueDate = document.getElementById('editNoteDueDate');
    this.closeEditModalBtn = document.getElementById('closeEditModalBtn');
    this.cancelEditBtn = document.getElementById('cancelEditBtn');

    this.categoryModal = document.getElementById('categoryModal');
    this.categoryListContainer = document.getElementById('categoryListContainer');
    this.newCategoryForm = document.getElementById('newCategoryForm');
    this.newCategoryName = document.getElementById('newCategoryName');
    this.newCategoryColor = document.getElementById('newCategoryColor');
    this.openCategoryModalBtn = document.getElementById('openCategoryModalBtn');
    this.closeCategoryModalBtn = document.getElementById('closeCategoryModalBtn');
    this.cancelCategoryBtn = document.getElementById('cancelCategoryBtn');

    // Carpeta de Notas (Almacenamiento Físico Exclusivo)
    this.selectFolderBtn = document.getElementById('selectFolderBtn');
    this.selectFolderBtnLabel = document.getElementById('selectFolderBtnLabel');
    this.disconnectFolderBtn = document.getElementById('disconnectFolderBtn');
    this.syncDot = document.getElementById('syncDot');
    this.syncStatusText = document.getElementById('syncStatusText');
    this.syncFolderText = document.getElementById('syncFolderText');

    // Modal de Diálogo Personalizado (Reemplazo estético de alert y confirm)
    this.customDialogModal = document.getElementById('customDialogModal');
    this.dialogIcon = document.getElementById('dialogIcon');
    this.dialogTitle = document.getElementById('dialogTitle');
    this.dialogMessage = document.getElementById('dialogMessage');
    this.dialogCloseBtn = document.getElementById('dialogCloseBtn');
    this.dialogCancelBtn = document.getElementById('dialogCancelBtn');
    this.dialogConfirmBtn = document.getElementById('dialogConfirmBtn');
  }

  /**
   * Muestra un diálogo informativo o de aviso estilizado con la estética de la app.
   * @param {Object} options
   * @param {string} options.title - Título del diálogo
   * @param {string} options.message - Mensaje explicativo
   * @param {string} [options.icon='🔔'] - Icono emoji o distintivo
   * @param {string} [options.confirmText='Aceptar'] - Texto del botón
   * @returns {Promise<void>}
   */
  showAlert({ title = 'Aviso', message = '', icon = '🔔', confirmText = 'Aceptar' } = {}) {
    return new Promise((resolve) => {
      this.dialogIcon.textContent = icon;
      this.dialogTitle.textContent = title;
      this.dialogMessage.textContent = message;
      this.dialogConfirmBtn.textContent = confirmText;
      this.dialogConfirmBtn.className = 'btn';
      this.dialogCancelBtn.style.display = 'none';
      this.dialogCloseBtn.style.display = 'block';

      this.customDialogModal.classList.add('active');
      this.customDialogModal.setAttribute('aria-hidden', 'false');
      this.dialogConfirmBtn.focus();

      let resolved = false;
      const cleanup = () => {
        if (resolved) return;
        resolved = true;
        this.customDialogModal.classList.remove('active');
        this.customDialogModal.setAttribute('aria-hidden', 'true');
        this.dialogConfirmBtn.removeEventListener('click', onConfirm);
        this.dialogCloseBtn.removeEventListener('click', onConfirm);
        this.customDialogModal.removeEventListener('click', onBackdrop);
        window.removeEventListener('keydown', onKey);
        resolve();
      };

      const onConfirm = () => cleanup();
      const onBackdrop = (e) => {
        if (e.target === this.customDialogModal) cleanup();
      };
      const onKey = (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          e.preventDefault();
          cleanup();
        }
      };

      this.dialogConfirmBtn.addEventListener('click', onConfirm);
      this.dialogCloseBtn.addEventListener('click', onConfirm);
      this.customDialogModal.addEventListener('click', onBackdrop);
      window.addEventListener('keydown', onKey);
    });
  }

  /**
   * Muestra un diálogo de confirmación interactivo estilizado con la estética de la app.
   * @param {Object} options
   * @param {string} options.title - Título del diálogo
   * @param {string} options.message - Pregunta o confirmación
   * @param {string} [options.icon='❓'] - Icono emoji
   * @param {string} [options.confirmText='Aceptar'] - Texto del botón principal
   * @param {string} [options.cancelText='Cancelar'] - Texto del botón cancelar
   * @param {boolean} [options.isDanger=false] - Si la acción es destructiva
   * @returns {Promise<boolean>}
   */
  showConfirm({
    title = 'Confirmación',
    message = '',
    icon = '❓',
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    isDanger = false
  } = {}) {
    return new Promise((resolve) => {
      this.dialogIcon.textContent = icon;
      this.dialogTitle.textContent = title;
      this.dialogMessage.textContent = message;
      this.dialogConfirmBtn.textContent = confirmText;
      this.dialogConfirmBtn.className = isDanger ? 'btn-danger' : 'btn';
      this.dialogCancelBtn.textContent = cancelText;
      this.dialogCancelBtn.style.display = 'block';
      this.dialogCloseBtn.style.display = 'block';

      this.customDialogModal.classList.add('active');
      this.customDialogModal.setAttribute('aria-hidden', 'false');

      // Foco predeterminado accesible
      if (isDanger) {
        this.dialogCancelBtn.focus();
      } else {
        this.dialogConfirmBtn.focus();
      }

      let resolved = false;
      const cleanup = (value) => {
        if (resolved) return;
        resolved = true;
        this.customDialogModal.classList.remove('active');
        this.customDialogModal.setAttribute('aria-hidden', 'true');
        this.dialogConfirmBtn.removeEventListener('click', onConfirm);
        this.dialogCancelBtn.removeEventListener('click', onCancel);
        this.dialogCloseBtn.removeEventListener('click', onCancel);
        this.customDialogModal.removeEventListener('click', onBackdrop);
        window.removeEventListener('keydown', onKey);
        resolve(value);
      };

      const onConfirm = () => cleanup(true);
      const onCancel = () => cleanup(false);
      const onBackdrop = (e) => {
        if (e.target === this.customDialogModal) cleanup(false);
      };
      const onKey = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          cleanup(false);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (document.activeElement === this.dialogCancelBtn) {
            cleanup(false);
          } else {
            cleanup(true);
          }
        }
      };

      this.dialogConfirmBtn.addEventListener('click', onConfirm);
      this.dialogCancelBtn.addEventListener('click', onCancel);
      this.dialogCloseBtn.addEventListener('click', onCancel);
      this.customDialogModal.addEventListener('click', onBackdrop);
      window.addEventListener('keydown', onKey);
    });
  }

  initTheme() {
    const currentTheme = StorageService.getTheme();
    if (currentTheme === 'light') {
      document.body.classList.add('light-theme');
      this.themeIcon.textContent = '☀️';
      this.themeLabel.textContent = 'Modo Claro';
    } else {
      document.body.classList.remove('light-theme');
      this.themeIcon.textContent = '🌙';
      this.themeLabel.textContent = 'Modo Oscuro';
    }
  }

  toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    StorageService.setTheme(newTheme);
    this.themeIcon.textContent = isLight ? '☀️' : '🌙';
    this.themeLabel.textContent = isLight ? 'Modo Claro' : 'Modo Oscuro';
  }

  initViewMode() {
    this.applyViewMode();
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    StorageService.saveViewMode(this.viewMode);

    // Al volver a la vista cuadrícula, las tarjetas deben volver al tamaño mínimo ya decidido (98px de alto, 240px de ancho)
    if (this.viewMode === 'grid') {
      this.applyCardSize(GRID_MIN_CARD_SIZE.width, GRID_MIN_CARD_SIZE.height);
      StorageService.saveCardSize(GRID_MIN_CARD_SIZE);
    }

    this.applyViewMode();
  }

  applyViewMode() {
    const isList = this.viewMode === 'list';
    if (this.notesGrid) {
      this.notesGrid.classList.toggle('view-list', isList);
      this.notesGrid.classList.toggle('view-grid', !isList);
    }
    document.body.classList.toggle('is-view-list', isList);
    document.body.classList.toggle('is-view-grid', !isList);

    if (this.viewToggleBtn) {
      this.viewToggleBtn.title = isList 
        ? 'Cambiar a vista de cuadrícula' 
        : 'Cambiar a vista de lista (una tarea por línea)';
    }
    if (this.viewIconList) this.viewIconList.style.display = isList ? 'none' : 'inline-block';
    if (this.viewIconGrid) this.viewIconGrid.style.display = isList ? 'inline-block' : 'none';
    if (this.viewToggleLabel) this.viewToggleLabel.textContent = isList ? 'Vista Cuadrícula' : 'Vista Lista';

    // En vista lista, el botón de restablecer tamaño nunca debe mostrarse
    this.updateCardSizeResetButton();
  }

  initCardSizeAndTextScale() {
    this.applyCardSize(this.cardSize.width, this.cardSize.height);
    this.applyTextScale(this.textScale);
  }

  applyCardSize(width, height) {
    const wasSingleRow = !!this.isSingleRow;
    this.cardSize = { width, height };
    document.documentElement.style.setProperty('--card-min-width', `${width}px`);
    document.documentElement.style.setProperty('--card-height', `${height}px`);
    this.checkSingleRowLayout(wasSingleRow);
    this.updateCardSizeResetButton();
  }

  checkSingleRowLayout(wasSingleRow = false) {
    if (!this.notesGrid) return;
    const gridWidth = this.notesGrid.clientWidth;
    if (!gridWidth) return;
    const gap = 8; // 0.5rem
    const cols = Math.floor((gridWidth + gap) / (this.cardSize.width + gap));
    const isSingleRow = cols <= 1;

    // Si transiciona a fila única y la altura era la de tarjeta estándar, ajustar a fila compacta
    if (isSingleRow && !wasSingleRow && this.cardSize.height >= 140) {
      this.prevCardHeight = this.cardSize.height;
      this.cardSize.height = 56;
      document.documentElement.style.setProperty('--card-height', '56px');
    } else if (!isSingleRow && wasSingleRow && this.cardSize.height <= 80) {
      const restoredH = this.prevCardHeight || DEFAULT_CARD_SIZE.height;
      this.cardSize.height = restoredH;
      document.documentElement.style.setProperty('--card-height', `${restoredH}px`);
    }

    this.isSingleRow = isSingleRow;
    this.notesGrid.classList.toggle('is-single-row', isSingleRow);

    const isMultilineText = isSingleRow && this.cardSize.height > 58;
    this.notesGrid.classList.toggle('multiline-text', isMultilineText);
  }

  applyTextScale(scale) {
    this.textScale = scale;
    document.documentElement.style.setProperty('--text-scale', scale);
    if (this.textSizeSelect) {
      this.textSizeSelect.value = scale;
    }
  }

  updateCardSizeResetButton() {
    if (!this.resetCardSizeBtn) return;
    // En vista lista nunca debe mostrarse el botón de restablecer tamaño
    if (this.viewMode === 'list') {
      this.resetCardSizeBtn.style.display = 'none';
      return;
    }
    const isCustom = this.cardSize.width !== DEFAULT_CARD_SIZE.width || this.cardSize.height !== DEFAULT_CARD_SIZE.height;
    this.resetCardSizeBtn.style.display = isCustom ? 'inline-flex' : 'none';
    if (isCustom) {
      this.resetCardSizeBtn.innerHTML = `<span>↺</span> Restablecer tamaño (${this.cardSize.width}×${this.cardSize.height}px)`;
    }
  }

  startResizingCards(e, card) {
    // En vista lista no se permite cambiar el tamaño de las fichas
    if (this.viewMode === 'list') return;

    const rect = card.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;

    document.body.classList.add('is-resizing-cards');

    const onPointerMove = (moveEvt) => {
      const deltaX = moveEvt.clientX - startX;
      const deltaY = moveEvt.clientY - startY;

      // En modo cuadrícula: altura mínima 96px (tarjeta compacta ceñida sin blancos sobrantes)
      const minH = 96;
      const maxH = 600;
      const minW = 210;
      const maxW = 750;

      const newWidth = Math.round(Math.max(minW, Math.min(maxW, startWidth + deltaX)));
      const newHeight = Math.round(Math.max(minH, Math.min(maxH, startHeight + deltaY)));

      this.applyCardSize(newWidth, newHeight);
    };

    const onPointerUp = () => {
      document.body.classList.remove('is-resizing-cards');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      StorageService.saveCardSize(this.cardSize);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  // --- Sistema Moderno de Tooltips Flotantes (Reemplaza los tooltips antiguos del navegador) ---
  initTooltips() {
    this.tooltipEl = document.getElementById('appTooltip');
    if (!this.tooltipEl) return;

    let showTimeout = null;
    let currentTarget = null;

    const showTooltip = (el) => {
      const text = el.getAttribute('data-tooltip') || el.getAttribute('title');
      if (!text || !text.trim()) return;

      // Transferir y eliminar title nativo inmediatamente para silenciar el tooltip del OS
      if (el.hasAttribute('title')) {
        el.setAttribute('data-tooltip', text);
        el.removeAttribute('title');
      }

      this.tooltipEl.textContent = text;
      this.tooltipEl.classList.remove('visible');

      const rect = el.getBoundingClientRect();
      const tooltipRect = this.tooltipEl.getBoundingClientRect();

      let top = rect.top - tooltipRect.height - 7;
      if (top < 6) {
        top = rect.bottom + 7;
      }

      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      left = Math.max(8, Math.min(window.innerWidth - tooltipRect.width - 8, left));

      this.tooltipEl.style.top = `${Math.round(top)}px`;
      this.tooltipEl.style.left = `${Math.round(left)}px`;
      this.tooltipEl.classList.add('visible');
    };

    const hideTooltip = () => {
      clearTimeout(showTimeout);
      currentTarget = null;
      if (this.tooltipEl) {
        this.tooltipEl.classList.remove('visible');
      }
    };

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-tooltip], [title]');
      if (!target || target === this.tooltipEl) return;

      if (target.hasAttribute('title')) {
        const titleText = target.getAttribute('title');
        target.setAttribute('data-tooltip', titleText);
        target.removeAttribute('title');
      }

      currentTarget = target;
      clearTimeout(showTimeout);
      showTimeout = setTimeout(() => {
        if (currentTarget === target) {
          showTooltip(target);
        }
      }, 70);
    }, true);

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target && target === currentTarget) {
        hideTooltip();
      }
    }, true);

    document.addEventListener('mousedown', hideTooltip, true);
    window.addEventListener('scroll', hideTooltip, true);
  }

  toggleForm(forceState = null) {
    const isOpen = forceState !== null ? forceState : !this.newNoteSection.classList.contains('open');
    if (isOpen) {
      this.newNoteSection.classList.add('open');
      if (this.toggleFormBtnText) this.toggleFormBtnText.textContent = 'Ocultar Form';
      this.noteTitleInput.focus();
    } else {
      this.newNoteSection.classList.remove('open');
      if (this.toggleFormBtnText) this.toggleFormBtnText.textContent = 'Nueva Nota';
    }
  }

  toggleSidebar(open = null) {
    const shouldOpen = open !== null ? open : !this.sidebar.classList.contains('open');
    if (shouldOpen) {
      this.sidebar.classList.add('open');
      this.sidebarBackdrop.classList.add('active');
    } else {
      this.sidebar.classList.remove('open');
      this.sidebarBackdrop.classList.remove('active');
    }
  }

  populateCategoryOptions() {
    const createOptions = () =>
      this.categories
        .map((c) => `<option value="${this.escapeHTML(c.name)}">${this.escapeHTML(c.name)}</option>`)
        .join('');

    this.noteCategorySelect.innerHTML = createOptions();
    this.editNoteCategory.innerHTML = createOptions();
  }

  renderSidebarCategories() {
    if (!this.sidebarCategoryList) return;

    const isAllActive = this.activeCategoryFilter === 'all';
    const allItem = `
      <button class="cat-item ${isAllActive ? 'active' : ''}" data-category="all" title="Ver todas las categorías">
        <span class="nav-label-wrap">
          <span>📁</span>
          <span>Todas las categorías</span>
        </span>
        <span class="nav-badge">${this.notes.length}</span>
      </button>
    `;

    const catItems = this.categories
      .map((c) => {
        const count = this.notes.filter((n) => n.category.toLowerCase() === c.name.toLowerCase()).length;
        const isActive = this.activeCategoryFilter.toLowerCase() === c.name.toLowerCase() ? 'active' : '';
        return `
          <button class="cat-item ${isActive}" data-category="${this.escapeHTML(c.name)}">
            <span class="nav-label-wrap">
              <span class="color-dot" style="background: ${c.color};"></span>
              <span>${this.escapeHTML(c.name)}</span>
            </span>
            <span class="nav-badge">${count}</span>
          </button>
        `;
      })
      .join('');

    this.sidebarCategoryList.innerHTML = allItem + catItems;

    this.sidebarCategoryList.querySelectorAll('.cat-item').forEach((item) => {
      item.addEventListener('click', () => {
        const catName = item.dataset.category;
        if (catName === 'all' || this.activeCategoryFilter.toLowerCase() === catName.toLowerCase()) {
          this.activeCategoryFilter = 'all';
        } else {
          this.activeCategoryFilter = catName;
        }
        this.renderSidebarCategories();
        this.render();
        if (window.innerWidth <= 850) this.toggleSidebar(false);
      });
    });
  }

  renderCategoryList() {
    if (!this.categoryListContainer) return;
    this.categoryListContainer.innerHTML = this.categories
      .map(
        (c) => `
        <div class="category-item-row">
          <div class="category-info">
            <span class="color-dot" style="background: ${c.color};"></span>
            <strong>${this.escapeHTML(c.name)}</strong>
          </div>
          ${
            this.categories.length > 1
              ? `<button class="btn-delete-cat" data-id="${c.id}" title="Eliminar categoría">🗑️</button>`
              : '<span style="font-size:0.75rem; color:var(--text-muted);">(Única)</span>'
          }
        </div>
      `
      )
      .join('');

    this.categoryListContainer.querySelectorAll('.btn-delete-cat').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.deleteCategory(btn.dataset.id);
      });
    });
  }

  async deleteCategory(catId) {
    const cat = this.categories.find((c) => c.id === catId);
    if (!cat) return;

    if (this.categories.length <= 1) {
      await this.showAlert({
        title: 'Categoría Protegida',
        message: 'Debe existir al menos una categoría en el sistema.',
        icon: '⚠️'
      });
      return;
    }

    const countNotes = this.notes.filter(
      (n) => n.category.toLowerCase() === cat.name.toLowerCase()
    ).length;

    const msg = countNotes > 0
      ? `¿Eliminar la categoría "${cat.name}"?\n${countNotes} nota(s) asociada(s) se reasignarán a la categoría general.`
      : `¿Estás seguro de que deseas eliminar la categoría "${cat.name}"?`;

    const confirmed = await this.showConfirm({
      title: 'Eliminar Categoría',
      message: msg,
      icon: '🏷️',
      confirmText: 'Eliminar Categoría',
      cancelText: 'Cancelar',
      isDanger: true
    });

    if (confirmed) {
      this.categories = this.categories.filter((c) => c.id !== catId);
      const fallbackCat = this.categories.find((c) => c.name.toLowerCase() === 'general') || this.categories[0];

      this.notes.forEach((n) => {
        if (n.category.toLowerCase() === cat.name.toLowerCase()) {
          n.category = fallbackCat.name;
        }
      });

      if (this.activeCategoryFilter.toLowerCase() === cat.name.toLowerCase()) {
        this.activeCategoryFilter = 'all';
      }

      this.saveToDirectory();

      this.populateCategoryOptions();
      this.renderSidebarCategories();
      this.renderCategoryList();
      this.render();
    }
  }

  bindEvents() {
    // Menú móvil / Backdrop
    this.mobileMenuBtn.addEventListener('click', () => this.toggleSidebar(true));
    this.mobileCloseSidebarBtn.addEventListener('click', () => this.toggleSidebar(false));
    this.sidebarBackdrop.addEventListener('click', () => this.toggleSidebar(false));

    // Formulario Toggle
    this.toggleFormBtn.addEventListener('click', () => this.toggleForm());
    this.closeFormBtn.addEventListener('click', () => this.toggleForm(false));

    // Navegación por Estado en Sidebar
    this.navItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.navItems.forEach((n) => n.classList.remove('active'));
        item.classList.add('active');
        this.statusFilter = item.dataset.statusFilter;
        this.render();
        if (window.innerWidth <= 850) this.toggleSidebar(false);
      });
    });

    // Tema
    this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

    // Nueva Nota
    this.newNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddNote();
    });

    // Búsqueda
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    // Ordenación
    this.sortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.render();
    });

    // Modal Detalle
    this.closeDetailModalBtn.addEventListener('click', () => this.closeDetailModal());
    this.closeDetailBtn.addEventListener('click', () => this.closeDetailModal());
    this.editFromDetailBtn.addEventListener('click', () => {
      const id = this.currentDetailNoteId;
      this.closeDetailModal();
      this.openEditModal(id);
    });

    // Modal Editar
    this.closeEditModalBtn.addEventListener('click', () => this.closeEditModal());
    this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
    this.editNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveEdit();
    });

    // Modal Categoría
    this.openCategoryModalBtn.addEventListener('click', () => this.openCategoryModal());
    this.closeCategoryModalBtn.addEventListener('click', () => this.closeCategoryModal());
    this.cancelCategoryBtn.addEventListener('click', () => this.closeCategoryModal());
    this.newCategoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddCategory();
    });

    // Selección / Desvinculación de Carpeta de Notas
    this.selectFolderBtn.addEventListener('click', () => this.selectFolder());
    this.disconnectFolderBtn.addEventListener('click', () => this.disconnectFolder());

    // Escala de texto
    if (this.textSizeSelect) {
      this.textSizeSelect.addEventListener('change', (e) => {
        const scale = e.target.value;
        this.applyTextScale(scale);
        StorageService.saveTextScale(scale);
      });
    }

    // Conmutador de Vista (Cuadrícula / Lista de una tarea por línea)
    if (this.viewToggleBtn) {
      this.viewToggleBtn.addEventListener('click', () => this.toggleViewMode());
    }

    // Restablecer tamaño de tarjetas
    if (this.resetCardSizeBtn) {
      this.resetCardSizeBtn.addEventListener('click', () => {
        this.applyCardSize(DEFAULT_CARD_SIZE.width, DEFAULT_CARD_SIZE.height);
        StorageService.resetCardSize();
      });
    }

    // Adaptar modo al redimensionar ventana
    window.addEventListener('resize', () => {
      this.checkSingleRowLayout();
      this.applyViewMode();
    });
  }

  async handleAddNote() {
    if (!this.dirHandle) {
      await this.showAlert({
        title: 'Carpeta Requerida',
        message: 'Por favor selecciona primero tu carpeta de notas para poder guardar.',
        icon: '📁',
        confirmText: 'Seleccionar Carpeta'
      });
      await this.selectFolder();
      return;
    }

    const title = this.noteTitleInput.value.trim();
    const content = this.noteContentInput.value.trim();
    const category = this.noteCategorySelect.value;
    const due_date = this.noteDueDateInput.value;

    if (!title) return;

    const newNote = {
      id: 'note-' + Date.now(),
      title,
      content,
      category,
      due_date: due_date || '',
      is_completed: false,
      created_at: new Date().toISOString()
    };

    this.notes.unshift(newNote);
    await this.saveToDirectory();
    this.newNoteForm.reset();
    this.toggleForm(false);
    this.renderSidebarCategories();
    this.render();
  }

  openDetailModal(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    if (!note) return;

    this.currentDetailNoteId = note.id;
    this.detailTitle.textContent = note.title;
    this.detailContent.textContent = note.content || 'Esta nota no tiene descripción detallada.';
    this.detailCreatedAt.textContent = `Registrada el ${this.formatDate(note.created_at)}`;

    const catColor = this.getCategoryColor(note.category);
    const todayStr = new Date().toISOString().split('T')[0];

    let dueHtml = '';
    if (note.due_date) {
      let badgeClass = 'due-future';
      let label = `📅 Fecha Límite: ${note.due_date}`;
      if (!note.is_completed) {
        if (note.due_date < todayStr) {
          badgeClass = 'due-overdue';
          label = `⚠️ Vencida (${note.due_date})`;
        } else if (note.due_date === todayStr) {
          badgeClass = 'due-today';
          label = `⏰ Vence hoy`;
        }
      }
      dueHtml = `<span class="due-badge ${badgeClass}">${label}</span>`;
    }

    const statusBadge = note.is_completed
      ? '<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">✅ Completada</span>'
      : '<span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">⏳ Pendiente</span>';

    this.detailMetaRow.innerHTML = `
      <span class="badge" style="background: ${catColor}22; color: ${catColor}; border: 1px solid ${catColor}44;">
        🏷️ ${this.escapeHTML(note.category)}
      </span>
      ${statusBadge}
      ${dueHtml}
    `;

    this.detailModal.classList.add('active');
  }

  closeDetailModal() {
    this.detailModal.classList.remove('active');
    this.currentDetailNoteId = null;
  }

  openEditModal(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    if (!note) return;

    this.editNoteId.value = note.id;
    this.editNoteTitle.value = note.title;
    this.editNoteContent.value = note.content || '';
    this.editNoteCategory.value = note.category;
    this.editNoteDueDate.value = note.due_date || '';

    this.editModal.classList.add('active');
  }

  closeEditModal() {
    this.editModal.classList.remove('active');
  }

  async handleSaveEdit() {
    const noteId = this.editNoteId.value;
    const note = this.notes.find((n) => n.id === noteId);
    if (!note) return;

    note.title = this.editNoteTitle.value.trim();
    note.content = this.editNoteContent.value.trim();
    note.category = this.editNoteCategory.value;
    note.due_date = this.editNoteDueDate.value || '';

    await this.saveToDirectory();
    this.closeEditModal();
    this.renderSidebarCategories();
    this.render();
  }

  openCategoryModal() {
    this.renderCategoryList();
    this.categoryModal.classList.add('active');
    this.newCategoryName.focus();
  }

  closeCategoryModal() {
    this.categoryModal.classList.remove('active');
    this.newCategoryForm.reset();
  }

  async handleAddCategory() {
    const name = this.newCategoryName.value.trim();
    const color = this.newCategoryColor.value;

    if (!name) return;

    const exists = this.categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      await this.showAlert({
        title: 'Categoría Duplicada',
        message: `Ya existe una categoría con el nombre "${name}".`,
        icon: '⚠️'
      });
      return;
    }

    const newCat = {
      id: 'cat-' + Date.now(),
      name,
      color
    };

    this.categories.push(newCat);
    await this.saveToDirectory();

    this.populateCategoryOptions();
    this.renderSidebarCategories();
    this.renderCategoryList();
    this.closeCategoryModal();
    this.render();
  }

  async toggleNoteStatus(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    if (note) {
      note.is_completed = !note.is_completed;
      await this.saveToDirectory();
      this.render();
    }
  }

  async deleteNote(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    const title = note ? `"${note.title}"` : 'esta nota';

    const confirmed = await this.showConfirm({
      title: 'Eliminar Nota',
      message: `¿Estás seguro de que deseas eliminar permanentemente ${title}?`,
      icon: '🗑️',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      isDanger: true
    });

    if (confirmed) {
      this.notes = this.notes.filter((n) => n.id !== noteId);
      await this.saveToDirectory();
      this.renderSidebarCategories();
      this.render();
    }
  }

  // --- Almacenamiento Exclusivo en Carpeta Física (File System Access API) ---
  async initFolderStorage() {
    if (!('showDirectoryPicker' in window)) {
      this.updateSyncUI(false);
      this.render();
      return;
    }

    const stored = await getStoredDirHandle();
    if (!stored) {
      this.updateSyncUI(false);
      this.render();
      return;
    }

    try {
      const perm = await stored.queryPermission({ mode: 'readwrite' });
      if (perm === 'granted') {
        this.dirHandle = stored;
        await this.loadDataFromDirectory();
        this.updateSyncUI(true, this.dirHandle.name);
      } else {
        // Permiso pendiente para la sesión actual (requiere un clic de usuario por seguridad del navegador)
        this.pendingDirHandle = stored;
        this.syncDot.classList.remove('connected');
        this.syncDot.classList.add('pending');
        this.syncStatusText.textContent = 'Permiso requerido';
        this.syncFolderText.textContent = `📁 ${stored.name} (notas.json)`;
        this.selectFolderBtnLabel.textContent = 'Reconectar Carpeta';
        this.disconnectFolderBtn.style.display = 'block';
        this.render();
      }
    } catch (err) {
      console.warn('Error al verificar dirHandle guardado:', err);
      this.updateSyncUI(false);
      this.render();
    }
  }

  async selectFolder() {
    if (!('showDirectoryPicker' in window)) {
      await this.showAlert({
        title: 'Navegador No Compatible',
        message: 'Tu navegador actual no soporta la selección nativa de carpetas (File System Access API).\nTe recomendamos usar Microsoft Edge o Google Chrome.',
        icon: '🌐'
      });
      return;
    }

    try {
      let handle;
      if (this.pendingDirHandle) {
        // Reconexión ágil en 1 clic: solicitar permiso para la carpeta ya vinculada
        const perm = await this.pendingDirHandle.requestPermission({ mode: 'readwrite' });
        if (perm === 'granted') {
          handle = this.pendingDirHandle;
          this.pendingDirHandle = null;
        } else {
          // Si el usuario no concede permiso a la anterior, abrimos el selector para elegir carpeta
          handle = await window.showDirectoryPicker({ mode: 'readwrite' });
        }
      } else {
        handle = await window.showDirectoryPicker({ mode: 'readwrite' });
      }

      if (!handle) return;

      this.dirHandle = handle;
      this.pendingDirHandle = null;

      // Cargar o crear notas.json en la carpeta elegida
      await this.loadDataFromDirectory();

      // Guardar dirHandle en IndexedDB en segundo plano
      saveStoredDirHandle(handle).catch(() => {});

      this.updateSyncUI(true, this.dirHandle.name);
      this.render();
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error al seleccionar carpeta:', err);
        await this.showAlert({
          title: 'Error de Acceso a Carpeta',
          message: 'No se pudo acceder a la carpeta seleccionada:\n' + err.message,
          icon: '⚠️'
        });
      }
    }
  }

  async loadDataFromDirectory() {
    if (!this.dirHandle) return;

    try {
      const fileHandle = await this.dirHandle.getFileHandle('notas.json', { create: true });
      const file = await fileHandle.getFile();
      const text = await file.text();

      if (text.trim()) {
        try {
          const data = JSON.parse(text);
          let loadedNotes = null;
          let loadedCats = null;

          if (Array.isArray(data)) {
            loadedNotes = data;
          } else if (data && typeof data === 'object') {
            if (Array.isArray(data.notes)) loadedNotes = data.notes;
            if (Array.isArray(data.categories)) loadedCats = data.categories;
          }

          if (loadedNotes) {
            this.notes = loadedNotes;
          }
          if (loadedCats && loadedCats.length > 0) {
            this.categories = loadedCats;
          }
        } catch (parseErr) {
          console.warn('El archivo notas.json contenía formato inválido, inicializando estructura limpia:', parseErr);
          this.notes = [...INITIAL_SEED_NOTES];
          await this.saveToDirectory();
        }
      } else {
        // Archivo notas.json nuevo creado en la carpeta elegida: inicializar con notas de bienvenida y guardar de inmediato
        this.notes = [...INITIAL_SEED_NOTES];
        await this.saveToDirectory();
      }

      this.populateCategoryOptions();
      this.renderSidebarCategories();
    } catch (err) {
      console.error('Error al leer/crear notas.json en la carpeta:', err);
      await this.showAlert({
        title: 'Error en notas.json',
        message: 'Ocurrió un error al acceder a notas.json dentro de la carpeta:\n' + err.message,
        icon: '⚠️'
      });
    }
  }

  async saveToDirectory() {
    if (!this.dirHandle) return;

    try {
      const fileHandle = await this.dirHandle.getFileHandle('notas.json', { create: true });
      const writable = await fileHandle.createWritable();
      const payload = {
        version: 1,
        last_synced: new Date().toISOString(),
        notes: this.notes,
        categories: this.categories
      };
      await writable.write(JSON.stringify(payload, null, 2));
      await writable.close();
    } catch (err) {
      console.warn('Error al guardar en notas.json dentro de la carpeta:', err);
    }
  }

  async disconnectFolder() {
    this.dirHandle = null;
    this.pendingDirHandle = null;
    this.notes = [];
    await removeStoredDirHandle();
    this.updateSyncUI(false);
    this.render();
  }

  updateSyncUI(connected, folderName = '') {
    if (connected) {
      this.syncDot.classList.remove('pending');
      this.syncDot.classList.add('connected');
      this.syncStatusText.textContent = 'Carpeta Activa';
      const name = folderName || (this.dirHandle ? this.dirHandle.name : 'Carpeta');
      this.syncFolderText.textContent = `📁 ${name} (notas.json)`;
      this.selectFolderBtnLabel.textContent = 'Cambiar Carpeta';
      this.disconnectFolderBtn.style.display = 'block';
    } else {
      this.syncDot.classList.remove('connected', 'pending');
      this.syncStatusText.textContent = 'Sin carpeta';
      this.syncFolderText.textContent = 'Sin carpeta seleccionada';
      this.selectFolderBtnLabel.textContent = 'Seleccionar Carpeta';
      this.disconnectFolderBtn.style.display = 'none';
    }
  }

  getFilteredAndSortedNotes() {
    const todayStr = new Date().toISOString().split('T')[0];

    let result = this.notes.filter((note) => {
      // Filtro de categoría (Sidebar)
      const matchesCategory =
        this.activeCategoryFilter === 'all' ||
        note.category.toLowerCase() === this.activeCategoryFilter.toLowerCase();

      // Filtro de estado (Sidebar)
      let matchesStatus = true;
      if (this.statusFilter === 'pending') {
        matchesStatus = !note.is_completed;
      } else if (this.statusFilter === 'completed') {
        matchesStatus = note.is_completed;
      } else if (this.statusFilter === 'overdue') {
        matchesStatus = !note.is_completed && note.due_date && note.due_date < todayStr;
      }

      // Filtro de búsqueda
      const matchesSearch =
        !this.searchQuery ||
        note.title.toLowerCase().includes(this.searchQuery) ||
        (note.content && note.content.toLowerCase().includes(this.searchQuery));

      return matchesCategory && matchesStatus && matchesSearch;
    });

    // Ordenación
    result.sort((a, b) => {
      if (this.currentSort === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (this.currentSort === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      if (this.currentSort === 'az') {
        return a.title.localeCompare(b.title);
      }
      if (this.currentSort === 'due_date') {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return a.due_date.localeCompare(b.due_date);
      }
      if (this.currentSort === 'urgency') {
        const isAUrgent = a.category.toLowerCase() === 'urgente';
        const isBUrgent = b.category.toLowerCase() === 'urgente';
        if (isAUrgent && !isBUrgent) return -1;
        if (!isAUrgent && isBUrgent) return 1;
        return 0;
      }
      return 0;
    });

    return result;
  }

  updateStats() {
    const todayStr = new Date().toISOString().split('T')[0];
    const total = this.notes.length;
    const completed = this.notes.filter((n) => n.is_completed).length;
    const pending = total - completed;
    const overdue = this.notes.filter(
      (n) => !n.is_completed && n.due_date && n.due_date < todayStr
    ).length;

    this.totalNotesEl.textContent = total;
    this.pendingNotesEl.textContent = pending;
    this.completedNotesEl.textContent = completed;
    this.overdueNotesEl.textContent = overdue;
  }

  getCategoryColor(catName) {
    const cat = this.categories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
    return cat ? cat.color : '#94a3b8';
  }

  formatDate(isoString) {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short'
      });
    } catch {
      return '';
    }
  }

  formatDueDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year.slice(-2)}`;
    }
    return dateStr;
  }

  escapeHTML(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  render() {
    this.updateStats();

    // Si no hay carpeta conectada o hay permiso pendiente, mostrar tarjeta explicativa directa
    if (!this.dirHandle) {
      this.currentFilterTitle.innerHTML = `<span>Carpeta de Notas</span>`;
      this.currentFilterCount.textContent = '';

      if (this.pendingDirHandle) {
        this.notesGrid.innerHTML = `
          <div class="folder-state-card">
            <div class="folder-state-icon">🔒</div>
            <h3 class="folder-state-title">Permiso para acceder a tu carpeta de notas</h3>
            <p class="folder-state-desc">
              Tu carpeta vinculada es <strong>📁 ${this.escapeHTML(this.pendingDirHandle.name)}</strong>.<br>
              Haz clic en el botón para reanudar el acceso y cargar tus notas guardadas en <code>notas.json</code>.
            </p>
            <button class="folder-state-btn" id="reconnectFolderMainBtn">
              <span>🔓</span> Conceder Acceso y Cargar Notas
            </button>
          </div>
        `;
        const reconnBtn = document.getElementById('reconnectFolderMainBtn');
        if (reconnBtn) {
          reconnBtn.addEventListener('click', () => this.selectFolder());
        }
      } else {
        this.notesGrid.innerHTML = `
          <div class="folder-state-card">
            <div class="folder-state-icon">📁</div>
            <h3 class="folder-state-title">Selecciona tu carpeta de notas</h3>
            <p class="folder-state-desc">
              Tus tareas y notas se guardan de forma exclusiva en un archivo <code>notas.json</code> dentro de la carpeta que elijas (Google Drive, OneDrive o cualquier carpeta de tu equipo), sin almacenar nada en el navegador.
            </p>
            <button class="folder-state-btn" id="selectFolderMainBtn">
              <span>📁</span> Seleccionar Carpeta para Comenzar
            </button>
          </div>
        `;
        const selBtn = document.getElementById('selectFolderMainBtn');
        if (selBtn) {
          selBtn.addEventListener('click', () => this.selectFolder());
        }
      }
      return;
    }

    const filtered = this.getFilteredAndSortedNotes();
    const todayStr = new Date().toISOString().split('T')[0];

    // Actualizar barra de título de filtro activo y chips interactivos
    let filterName = 'Todas las notas';
    let statusLabel = '';
    if (this.statusFilter === 'pending') { filterName = 'Notas Pendientes'; statusLabel = 'Pendientes'; }
    if (this.statusFilter === 'completed') { filterName = 'Notas Completadas'; statusLabel = 'Completadas'; }
    if (this.statusFilter === 'overdue') { filterName = 'Notas Vencidas'; statusLabel = 'Vencidas'; }

    let chipsHtml = '';
    if (this.statusFilter !== 'all') {
      chipsHtml += `
        <span class="active-chip">
          Vista: ${statusLabel}
          <button class="btn-remove-chip" id="clearStatusChip" title="Ver todas las notas">✕</button>
        </span>
      `;
    }
    if (this.activeCategoryFilter !== 'all') {
      chipsHtml += `
        <span class="active-chip">
          🏷️ ${this.escapeHTML(this.activeCategoryFilter)}
          <button class="btn-remove-chip" id="clearCatChip" title="Quitar filtro de categoría">✕</button>
        </span>
      `;
    }

    this.currentFilterTitle.innerHTML = `<span>${filterName}</span> ${chipsHtml}`;
    this.currentFilterCount.textContent = `(${filtered.length} ${filtered.length === 1 ? 'nota' : 'notas'})`;

    // Listeners para quitar chips de filtros
    const clearCatBtn = document.getElementById('clearCatChip');
    if (clearCatBtn) {
      clearCatBtn.addEventListener('click', () => {
        this.activeCategoryFilter = 'all';
        this.renderSidebarCategories();
        this.render();
      });
    }

    const clearStatusBtn = document.getElementById('clearStatusChip');
    if (clearStatusBtn) {
      clearStatusBtn.addEventListener('click', () => {
        this.statusFilter = 'all';
        this.navItems.forEach((n) => n.classList.remove('active'));
        const allNav = document.querySelector('.nav-item[data-status-filter="all"]');
        if (allNav) allNav.classList.add('active');
        this.render();
      });
    }

    if (filtered.length === 0) {
      let msg = 'No se encontraron notas con el filtro o búsqueda actual.';
      if (this.statusFilter === 'pending') msg = '¡Genial! No tienes tareas pendientes.';
      if (this.statusFilter === 'completed') msg = 'Aún no has completado ninguna tarea.';
      if (this.statusFilter === 'overdue') msg = '¡Perfecto! No tienes tareas atrasadas.';

      this.notesGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <p>${msg}</p>
        </div>
      `;
      return;
    }

    this.notesGrid.innerHTML = filtered
      .map((note) => {
        const completedClass = note.is_completed ? 'completed' : '';
        const catColor = this.getCategoryColor(note.category);

        let dueDateHtml = '';
        if (note.due_date) {
          let badgeClass = 'due-future';
          const shortDate = this.formatDueDate(note.due_date);
          let iconSvg = `
            <svg class="badge-icon-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          `;
          let label = shortDate;
          if (!note.is_completed) {
            if (note.due_date < todayStr) {
              badgeClass = 'due-overdue';
              iconSvg = `
                <svg class="badge-icon-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              `;
              label = shortDate;
            } else if (note.due_date === todayStr) {
              badgeClass = 'due-today';
              iconSvg = `
                <svg class="badge-icon-svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              `;
              label = `Hoy ${shortDate}`;
            }
          }
          const tooltip = note.due_date < todayStr && !note.is_completed
            ? `Vencida (${shortDate})`
            : (note.due_date === todayStr && !note.is_completed ? `Vence hoy (${shortDate})` : `Fecha límite: ${shortDate}`);
          dueDateHtml = `<span class="due-badge ${badgeClass}" title="${tooltip}">${iconSvg}<span>${label}</span></span>`;
        }

        const dueListHtml = dueDateHtml ? `<span class="note-due-list-wrap">${dueDateHtml}</span>` : '';
        const dueGridHtml = dueDateHtml ? `<div class="note-due-grid-wrap">${dueDateHtml}</div>` : '';

        return `
          <div class="note-card ${completedClass}" data-id="${note.id}">
            <div class="note-header">
              <div class="note-title-wrap">
                <!-- Checkbox cuadrado moderno -->
                <button 
                  class="circle-check-btn" 
                  title="${note.is_completed ? 'Marcar como pendiente' : 'Marcar como completada'}"
                >
                  <span>✓</span>
                </button>
                <!-- Categoría visible al inicio en modo fila única -->
                <span class="badge note-badge-row" style="background: ${catColor}22; color: ${catColor}; border: 1px solid ${catColor}44;">
                  ${this.escapeHTML(note.category)}
                </span>
                <!-- Fecha límite a continuación de la categoría en vista lista -->
                ${dueListHtml}
                <!-- Bloque interactivo de texto para fila única y cuadrícula -->
                <div class="note-text-flow" title="Haz clic para ver el detalle completo">
                  <h3 class="note-title" title="${this.escapeHTML(note.title)}">${this.escapeHTML(note.title)}</h3>
                  <span class="note-desc-sep">—</span>
                  <span class="note-content-inline" title="${this.escapeHTML(note.content || '')}">
                    ${this.escapeHTML(note.content || 'Sin descripción adicional.')}
                  </span>
                </div>
              </div>
              <!-- Fecha visible arriba a la derecha en cuadrícula normal -->
              ${dueGridHtml}
            </div>
            <!-- Cuerpo multilínea (visible en cuadrícula normal) -->
            <div class="note-body" title="Haz clic para ver el detalle completo">
              <p class="note-content">${this.escapeHTML(note.content || 'Sin descripción adicional.')}</p>
            </div>
            <div class="note-footer">
              <div class="note-footer-meta">
                <span class="badge note-badge-card" style="background: ${catColor}22; color: ${catColor}; border: 1px solid ${catColor}44;">
                  ${this.escapeHTML(note.category)}
                </span>
              </div>
              <div class="card-actions">
                <button class="btn-action btn-detail" title="Ver detalle completo">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button class="btn-action btn-edit" title="Editar nota">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                    <path d="m15 5 4 4"/>
                  </svg>
                </button>
                <button class="btn-action btn-delete delete" title="Eliminar nota">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                  </svg>
                </button>
                <!-- Tirador para redimensionar todas las notas al arrastrar integrado en la misma fila -->
                <div class="card-resize-handle" title="Arrastra para cambiar el tamaño estándar de todas las notas">
                  <svg viewBox="0 0 14 14" width="10" height="10">
                    <path d="M12 2 L2 12 M12 6 L6 12 M12 10 L10 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    this.updateCardSizeResetButton();
    this.checkSingleRowLayout();

    // Listeners interactivos
    this.notesGrid.querySelectorAll('.note-card').forEach((card) => {
      const noteId = card.dataset.id;
      card.querySelector('.circle-check-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleNoteStatus(noteId);
      });
      // Ver detalle al hacer clic en el botón o en el cuerpo de la nota
      card.querySelector('.btn-detail').addEventListener('click', (e) => {
        e.stopPropagation();
        this.openDetailModal(noteId);
      });
      card.querySelector('.note-body').addEventListener('click', () => {
        this.openDetailModal(noteId);
      });
      const textFlow = card.querySelector('.note-text-flow');
      if (textFlow) {
        textFlow.addEventListener('click', () => {
          this.openDetailModal(noteId);
        });
      }
      card.querySelector('.btn-edit').addEventListener('click', (e) => {
        e.stopPropagation();
        this.openEditModal(noteId);
      });
      card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteNote(noteId);
      });
      const resizeHandle = card.querySelector('.card-resize-handle');
      if (resizeHandle) {
        resizeHandle.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.startResizingCards(e, card);
        });
      }
    });
  }
}

// Inicializar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  new NotesApp();
});
