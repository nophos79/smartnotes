/**
 * SpecKit Task & Notes Manager - Storage Layer (T02)
 * Persistencia en localStorage con datos iniciales (Seed Data).
 */

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

export class StorageService {
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
