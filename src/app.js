/**
 * SpecKit Task & Notes Manager - Core Application Logic
 * Cumple con los requisitos funcionales FR-001 a FR-005.
 */

import { StorageService } from './storage.js';

class NotesApp {
  constructor() {
    this.notes = StorageService.loadNotes();
    this.activeFilter = 'all';
    this.searchQuery = '';

    // Cache DOM Elements
    this.notesGrid = document.getElementById('notesGrid');
    this.newNoteForm = document.getElementById('newNoteForm');
    this.noteTitleInput = document.getElementById('noteTitle');
    this.noteContentInput = document.getElementById('noteContent');
    this.noteCategorySelect = document.getElementById('noteCategory');
    this.searchInput = document.getElementById('searchInput');
    this.filterPills = document.querySelectorAll('.pill');

    // Stats Elements
    this.totalNotesEl = document.getElementById('totalNotes');
    this.pendingNotesEl = document.getElementById('pendingNotes');
    this.completedNotesEl = document.getElementById('completedNotes');

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Form submission
    this.newNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddNote();
    });

    // Search input (reactivo en tiempo real)
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

    // Reset form
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
    if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
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
          <p>No hay notas que coincidan con el filtro actual.</p>
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

    // Attach dynamic listeners to cards
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
