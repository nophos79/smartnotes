/**
 * SmartNotes - Spec-Driven Development (v3)
 * Soporta:
 * - Formulario colapsable bajo demanda
 * - Métricas superiores clicables que filtran la lista
 * - Marcado de tareas evidente mediante botón check y clic en título
 * - Edición, fechas límite, ordenación, categorías personalizadas, temas y backups
 */

const STORAGE_KEY_NOTES = 'speckit_notes_data_v1';
const STORAGE_KEY_CATS = 'speckit_categories_v1';
const STORAGE_KEY_THEME = 'speckit_theme_v1';

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
    due_date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Ayer (vencida)
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
  static loadNotes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_NOTES);
      if (!data) {
        this.saveNotes(INITIAL_SEED_NOTES);
        return [...INITIAL_SEED_NOTES];
      }
      return JSON.parse(data);
    } catch {
      return [...INITIAL_SEED_NOTES];
    }
  }

  static saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  }

  static loadCategories() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CATS);
      if (!data) {
        this.saveCategories(DEFAULT_CATEGORIES);
        return [...DEFAULT_CATEGORIES];
      }
      return JSON.parse(data);
    } catch {
      return [...DEFAULT_CATEGORIES];
    }
  }

  static saveCategories(cats) {
    localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(cats));
  }

  static getTheme() {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  }

  static setTheme(theme) {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }
}

// --- Aplicación Principal ---
class NotesApp {
  constructor() {
    this.notes = StorageService.loadNotes();
    this.categories = StorageService.loadCategories();
    this.activeFilter = 'all'; // filtro de categoría
    this.statusFilter = 'all'; // filtro de estado: all, pending, completed, overdue
    this.searchQuery = '';
    this.currentSort = 'newest';

    this.cacheElements();
    this.initTheme();
    this.populateCategoryOptions();
    this.renderCategoryPills();
    this.bindEvents();
    this.render();
  }

  cacheElements() {
    this.notesGrid = document.getElementById('notesGrid');
    this.newNoteSection = document.getElementById('newNoteSection');
    this.toggleFormBtn = document.getElementById('toggleFormBtn');
    this.closeFormBtn = document.getElementById('closeFormBtn');
    this.newNoteForm = document.getElementById('newNoteForm');
    this.noteTitleInput = document.getElementById('noteTitle');
    this.noteContentInput = document.getElementById('noteContent');
    this.noteCategorySelect = document.getElementById('noteCategory');
    this.noteDueDateInput = document.getElementById('noteDueDate');
    this.searchInput = document.getElementById('searchInput');
    this.sortSelect = document.getElementById('sortSelect');
    this.categoryPillsContainer = document.getElementById('categoryPills');

    // Tarjetas de Métricas (Filtros clicables)
    this.statCards = document.querySelectorAll('.stat-card');
    this.totalNotesEl = document.getElementById('totalNotes');
    this.pendingNotesEl = document.getElementById('pendingNotes');
    this.completedNotesEl = document.getElementById('completedNotes');
    this.overdueNotesEl = document.getElementById('overdueNotes');

    // Theme Toggle
    this.themeToggleBtn = document.getElementById('themeToggleBtn');

    // Modales
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

    // Backup
    this.exportJsonBtn = document.getElementById('exportJsonBtn');
    this.importJsonBtn = document.getElementById('importJsonBtn');
    this.importFileInput = document.getElementById('importFileInput');
  }

  initTheme() {
    const currentTheme = StorageService.getTheme();
    if (currentTheme === 'light') {
      document.body.classList.add('light-theme');
      this.themeToggleBtn.textContent = '☀️ Modo Claro';
    } else {
      document.body.classList.remove('light-theme');
      this.themeToggleBtn.textContent = '🌙 Modo Oscuro';
    }
  }

  toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    StorageService.setTheme(newTheme);
    this.themeToggleBtn.textContent = isLight ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
  }

  toggleForm(forceState = null) {
    const isOpen = forceState !== null ? forceState : !this.newNoteSection.classList.contains('open');
    if (isOpen) {
      this.newNoteSection.classList.add('open');
      this.toggleFormBtn.textContent = '✕ Cerrar Formulario';
      this.noteTitleInput.focus();
    } else {
      this.newNoteSection.classList.remove('open');
      this.toggleFormBtn.textContent = '➕ Nueva Nota';
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

  renderCategoryPills() {
    const allPill = `
      <button class="pill ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">
        Todas
      </button>
    `;

    const catPills = this.categories
      .map((c) => {
        const isActive = this.activeFilter.toLowerCase() === c.name.toLowerCase() ? 'active' : '';
        return `
          <button class="pill ${isActive}" data-filter="${this.escapeHTML(c.name)}">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${c.color}; margin-right:4px;"></span>
            ${this.escapeHTML(c.name)}
          </button>
        `;
      })
      .join('');

    this.categoryPillsContainer.innerHTML = allPill + catPills;

    this.categoryPillsContainer.querySelectorAll('.pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        this.activeFilter = pill.dataset.filter;
        this.renderCategoryPills();
        this.render();
      });
    });
  }

  bindEvents() {
    // Alternar visibilidad del formulario
    this.toggleFormBtn.addEventListener('click', () => this.toggleForm());
    this.closeFormBtn.addEventListener('click', () => this.toggleForm(false));

    // Filtros clicables en las tarjetas de estadísticas
    this.statCards.forEach((card) => {
      card.addEventListener('click', () => {
        this.statCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        this.statusFilter = card.dataset.statusFilter;
        this.render();
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

    // Backup
    this.exportJsonBtn.addEventListener('click', () => this.exportBackup());
    this.importJsonBtn.addEventListener('click', () => this.importFileInput.click());
    this.importFileInput.addEventListener('change', (e) => this.importBackup(e));
  }

  handleAddNote() {
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
    StorageService.saveNotes(this.notes);
    this.newNoteForm.reset();
    this.toggleForm(false); // Ocultar formulario tras guardar
    this.render();
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

  handleSaveEdit() {
    const noteId = this.editNoteId.value;
    const note = this.notes.find((n) => n.id === noteId);
    if (!note) return;

    note.title = this.editNoteTitle.value.trim();
    note.content = this.editNoteContent.value.trim();
    note.category = this.editNoteCategory.value;
    note.due_date = this.editNoteDueDate.value || '';

    StorageService.saveNotes(this.notes);
    this.closeEditModal();
    this.render();
  }

  openCategoryModal() {
    this.renderCategoryList();
    this.categoryModal.classList.add('active');
    this.newCategoryName.focus();
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

  deleteCategory(catId) {
    const cat = this.categories.find((c) => c.id === catId);
    if (!cat) return;

    if (this.categories.length <= 1) {
      alert('Debe existir al menos una categoría en el sistema.');
      return;
    }

    const countNotes = this.notes.filter(
      (n) => n.category.toLowerCase() === cat.name.toLowerCase()
    ).length;

    const msg = countNotes > 0
      ? `¿Eliminar la categoría "${cat.name}"? ${countNotes} nota(s) asociada(s) se reasignarán automáticamente a la categoría general.`
      : `¿Eliminar la categoría "${cat.name}"?`;

    if (confirm(msg)) {
      // Remover categoría
      this.categories = this.categories.filter((c) => c.id !== catId);

      // Determinar categoría de reemplazo
      const fallbackCat = this.categories.find((c) => c.name.toLowerCase() === 'general') || this.categories[0];

      // Reasignar notas afectadas
      this.notes.forEach((n) => {
        if (n.category.toLowerCase() === cat.name.toLowerCase()) {
          n.category = fallbackCat.name;
        }
      });

      // Si el filtro activo era esta categoría, resetear a 'all'
      if (this.activeFilter.toLowerCase() === cat.name.toLowerCase()) {
        this.activeFilter = 'all';
      }

      // Persistir cambios
      StorageService.saveCategories(this.categories);
      StorageService.saveNotes(this.notes);

      // Actualizar interfaz
      this.populateCategoryOptions();
      this.renderCategoryPills();
      this.renderCategoryList();
      this.render();
    }
  }

  closeCategoryModal() {
    this.categoryModal.classList.remove('active');
    this.newCategoryForm.reset();
  }

  handleAddCategory() {
    const name = this.newCategoryName.value.trim();
    const color = this.newCategoryColor.value;

    if (!name) return;

    const exists = this.categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      alert('Ya existe una categoría con ese nombre.');
      return;
    }

    const newCat = {
      id: 'cat-' + Date.now(),
      name,
      color
    };

    this.categories.push(newCat);
    StorageService.saveCategories(this.categories);

    this.populateCategoryOptions();
    this.renderCategoryPills();
    this.renderCategoryList();
    this.closeCategoryModal();
    this.render();
  }

  toggleNoteStatus(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    if (note) {
      note.is_completed = !note.is_completed;
      StorageService.saveNotes(this.notes);
      this.render();
    }
  }

  deleteNote(noteId) {
    if (confirm('¿Deseas eliminar esta nota?')) {
      this.notes = this.notes.filter((n) => n.id !== noteId);
      StorageService.saveNotes(this.notes);
      this.render();
    }
  }

  exportBackup() {
    const backupData = {
      version: 1,
      exported_at: new Date().toISOString(),
      notes: this.notes,
      categories: this.categories
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartnotes_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data.notes)) {
          this.notes = data.notes;
          StorageService.saveNotes(this.notes);

          if (Array.isArray(data.categories)) {
            this.categories = data.categories;
            StorageService.saveCategories(this.categories);
            this.populateCategoryOptions();
            this.renderCategoryPills();
          }

          this.render();
          alert('¡Copia de seguridad restaurada con éxito!');
        } else {
          alert('El archivo no contiene un formato de notas válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  getFilteredAndSortedNotes() {
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Filtrado combinado (Categoría + Estado superior + Búsqueda de texto)
    let result = this.notes.filter((note) => {
      // Filtro de categoría
      const matchesCategory =
        this.activeFilter === 'all' ||
        note.category.toLowerCase() === this.activeFilter.toLowerCase();

      // Filtro de estado por tarjetas superiores
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

    // 2. Ordenación
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
    const filtered = this.getFilteredAndSortedNotes();
    const todayStr = new Date().toISOString().split('T')[0];

    if (filtered.length === 0) {
      let msg = 'No se encontraron notas con el filtro o búsqueda actual.';
      if (this.statusFilter === 'pending') msg = '¡Genial! No tienes tareas pendientes.';
      if (this.statusFilter === 'completed') msg = 'Aún no has completado ninguna tarea.';
      if (this.statusFilter === 'overdue') msg = '¡Perfecto! No tienes tareas vencidas.';

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

        // Indicador de Due Date
        let dueDateHtml = '';
        if (note.due_date) {
          let badgeClass = 'due-future';
          let label = `📅 ${note.due_date}`;
          if (!note.is_completed) {
            if (note.due_date < todayStr) {
              badgeClass = 'due-overdue';
              label = `⚠️ Vencida: ${note.due_date}`;
            } else if (note.due_date === todayStr) {
              badgeClass = 'due-today';
              label = `⏰ Vence hoy`;
            }
          }
          dueDateHtml = `<span class="due-badge ${badgeClass}">${label}</span>`;
        }

        return `
          <div class="note-card ${completedClass}" data-id="${note.id}">
            <div class="note-header">
              <div class="note-title-wrap">
                <!-- Botón de Checkbox táctil y visible -->
                <button 
                  class="status-checkbox-btn" 
                  title="${note.is_completed ? 'Marcar como pendiente' : 'Marcar como completada'}"
                >
                  ✓
                </button>
                <h3 class="note-title" title="Haz clic para alternar estado">${this.escapeHTML(note.title)}</h3>
              </div>
              <div class="card-actions">
                <button class="btn-action btn-edit" title="Editar nota">✏️</button>
                <button class="btn-action delete btn-delete" title="Eliminar nota">🗑️</button>
              </div>
            </div>
            ${
              note.content
                ? `<p class="note-content">${this.escapeHTML(note.content)}</p>`
                : ''
            }
            <div class="note-footer">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="badge" style="background: ${catColor}22; color: ${catColor}; border: 1px solid ${catColor}44;">
                  ${this.escapeHTML(note.category)}
                </span>
                ${dueDateHtml}
              </div>
              <span class="note-date">${this.formatDate(note.created_at)}</span>
            </div>
          </div>
        `;
      })
      .join('');

    // Listeners interactivos
    this.notesGrid.querySelectorAll('.note-card').forEach((card) => {
      const noteId = card.dataset.id;
      // Clic en el botón verde de check
      card.querySelector('.status-checkbox-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleNoteStatus(noteId);
      });
      // Clic directo en el título para marcar como completada
      card.querySelector('.note-title').addEventListener('click', () => {
        this.toggleNoteStatus(noteId);
      });
      // Botón editar
      card.querySelector('.btn-edit').addEventListener('click', (e) => {
        e.stopPropagation();
        this.openEditModal(noteId);
      });
      // Botón eliminar
      card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteNote(noteId);
      });
    });
  }
}

// Inicializar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  new NotesApp();
});
