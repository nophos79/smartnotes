/**
 * SpecKit Task & Notes Manager - Core Application Logic
 * Cumple con los requisitos funcionales FR-001 a FR-005.
 * Diseñado para ejecutarse directamente tanto en local (file://) como en servidor web.
 */

// --- Capa de Almacenamiento (Storage Service) ---
const STORAGE_KEY = 'speckit_notes_data_v1';

const INITIAL_SEED_NOTES = [
  {
    id: 'seed-01',
    title: 'Definir especificaciones con Spec Kit',
    content: 'Revisar la metodología SDD y estructurar el proyecto en fases: spec, plan, tasks e implement.',
    category: 'Trabajo',
    is_completed: true,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'seed-02',
    title: 'Revisar entrega de arquitectura',
    content: 'Validar criterios de aceptación SC-001 a SC-003 antes de pasar a producción.',
    category: 'Urgente',
    is_completed: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'seed-03',
    title: 'Comprar café y organizar el escritorio',
    content: 'Despejar el espacio de trabajo para la sesión de desarrollo.',
    category: 'Personal',
    is_completed: false,
    created_at: new Date(Date.now() - 3600000).toISOString()
  }
];

class StorageService {
  static loadNotes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveNotes(INITIAL_SEED_NOTES);
        return [...INITIAL_SEED_NOTES];
      }
      return JSON.parse(data);
    } catch (err) {
      console.warn('Error accediendo a localStorage. Usando datos en memoria.', err);
      return [...INITIAL_SEED_NOTES];
    }
  }

  static saveNotes(notes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      console.error('Error al persistir notas en localStorage:', err);
    }
  }

  static clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// --- Aplicación Principal ---
class NotesApp {
  constructor() {
    this.notes = StorageService.loadNotes();
    this.activeFilter = 'all';
    this.searchQuery = '';

    // Referencias del DOM
    this.notesGrid = document.getElementById('notesGrid');
    this.newNoteForm = document.getElementById('newNoteForm');
    this.noteTitleInput = document.getElementById('noteTitle');
    this.noteContentInput = document.getElementById('noteContent');
    this.noteCategorySelect = document.getElementById('noteCategory');
    this.searchInput = document.getElementById('searchInput');
    this.filterPills = document.querySelectorAll('.pill');

    // Elementos de Estadísticas
    this.totalNotesEl = document.getElementById('totalNotes');
    this.pendingNotesEl = document.getElementById('pendingNotes');
    this.completedNotesEl = document.getElementById('completedNotes');

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Envío del formulario
    this.newNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddNote();
    });

    // Búsqueda en tiempo real
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    // Filtros de categoría
    this.filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        this.filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.render();
      });
    });
  }

  handleAddNote() {
    const title = this.noteTitleInput.value.trim();
    const content = this.noteContentInput.value.trim();
    const category = this.noteCategorySelect.value;

    if (!title) {
      this.noteTitleInput.focus();
      return;
    }

    const newNote = {
      id: 'note-' + Date.now(),
      title,
      content,
      category,
      is_completed: false,
      created_at: new Date().toISOString()
    };

    this.notes.unshift(newNote);
    StorageService.saveNotes(this.notes);

    // Limpiar formulario y repintar
    this.newNoteForm.reset();
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

  getFilteredNotes() {
    return this.notes.filter((note) => {
      // Filtro por categoría
      const matchesCategory =
        this.activeFilter === 'all' ||
        note.category.toLowerCase() === this.activeFilter.toLowerCase();

      // Filtro por búsqueda de texto
      const matchesSearch =
        !this.searchQuery ||
        note.title.toLowerCase().includes(this.searchQuery) ||
        (note.content && note.content.toLowerCase().includes(this.searchQuery));

      return matchesCategory && matchesSearch;
    });
  }

  updateStats() {
    const total = this.notes.length;
    const completed = this.notes.filter((n) => n.is_completed).length;
    const pending = total - completed;

    this.totalNotesEl.textContent = total;
    this.pendingNotesEl.textContent = pending;
    this.completedNotesEl.textContent = completed;
  }

  formatDate(isoString) {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
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
    const filtered = this.getFilteredNotes();

    if (filtered.length === 0) {
      this.notesGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <p>No se encontraron notas para el filtro actual.</p>
        </div>
      `;
      return;
    }

    this.notesGrid.innerHTML = filtered
      .map((note) => {
        const catClass = 'badge-' + note.category.toLowerCase();
        const completedClass = note.is_completed ? 'completed' : '';
        return `
          <div class="note-card ${completedClass}" data-id="${note.id}">
            <div class="note-header">
              <div class="note-title-wrap">
                <input 
                  type="checkbox" 
                  class="note-checkbox" 
                  ${note.is_completed ? 'checked' : ''} 
                  title="Marcar como completada"
                />
                <h3 class="note-title">${this.escapeHTML(note.title)}</h3>
              </div>
              <button class="btn-delete" title="Eliminar nota">🗑️</button>
            </div>
            ${
              note.content
                ? `<p class="note-content">${this.escapeHTML(note.content)}</p>`
                : ''
            }
            <div class="note-footer">
              <span class="badge ${catClass}">${this.escapeHTML(note.category)}</span>
              <span class="note-date">${this.formatDate(note.created_at)}</span>
            </div>
          </div>
        `;
      })
      .join('');

    // Listeners interactivos para cada tarjeta
    this.notesGrid.querySelectorAll('.note-card').forEach((card) => {
      const noteId = card.dataset.id;
      const checkbox = card.querySelector('.note-checkbox');
      const deleteBtn = card.querySelector('.btn-delete');

      checkbox.addEventListener('change', () => this.toggleNoteStatus(noteId));
      deleteBtn.addEventListener('click', () => this.deleteNote(noteId));
    });
  }
}

// Inicializar la aplicación al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  new NotesApp();
});
