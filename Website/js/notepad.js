/**
 * Local Notepad Module
 * Simple note-taking widget that saves to localStorage
 */

const NOTEPAD_STORAGE_KEY = '8bitdashboard_notepad';

// Notepad state
let notepadState = {
  notes: [],
  isOpen: false
};

/**
 * Initialize the notepad widget
 */
function initNotepad() {
  const container = document.getElementById('notepad-container');
  if (!container) return;
  
  // Load saved notes
  loadNotes();
  
  // Update visibility based on settings
  updateNotepadVisibility();
  
  // Set up event handlers
  const toggleBtn = document.getElementById('notepad-toggle');
  const addBtn = document.getElementById('notepad-add');
  const notesList = document.getElementById('notepad-list');
  const input = document.getElementById('notepad-input');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleNotepad);
  }
  
  if (addBtn) {
    addBtn.addEventListener('click', addNote);
  }
  
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addNote();
      }
    });
  }
  
  // Render initial notes
  renderNotes();
}

/**
 * Toggle notepad panel visibility
 */
function toggleNotepad() {
  notepadState.isOpen = !notepadState.isOpen;
  const panel = document.getElementById('notepad-panel');
  const toggleBtn = document.getElementById('notepad-toggle');
  
  if (panel) {
    panel.style.display = notepadState.isOpen ? 'block' : 'none';
  }
  
  if (toggleBtn) {
    toggleBtn.textContent = notepadState.isOpen ? '📝 Hide To-Do' : '📝 To-Do';
  }
}

/**
 * Load notes from localStorage
 */
function loadNotes() {
  try {
    const saved = localStorage.getItem(NOTEPAD_STORAGE_KEY);
    if (saved) {
      notepadState.notes = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load notes:', e);
    notepadState.notes = [];
  }
}

/**
 * Save notes to localStorage
 */
function saveNotes() {
  try {
    localStorage.setItem(NOTEPAD_STORAGE_KEY, JSON.stringify(notepadState.notes));
  } catch (e) {
    console.error('Failed to save notes:', e);
  }
}

/**
 * Add a new note
 */
function addNote() {
  const input = document.getElementById('notepad-input');
  if (!input) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const note = {
    id: Date.now(),
    text: text,
    done: false,
    createdAt: new Date().toISOString()
  };
  
  notepadState.notes.unshift(note);
  saveNotes();
  renderNotes();
  
  input.value = '';
  input.focus();
}

/**
 * Toggle note completion status
 * @param {number} id - Note ID
 */
function toggleNoteComplete(id) {
  const note = notepadState.notes.find(n => n.id === id);
  if (note) {
    note.done = !note.done;
    saveNotes();
    renderNotes();
  }
}

/**
 * Delete a note
 * @param {number} id - Note ID
 */
function deleteNote(id) {
  notepadState.notes = notepadState.notes.filter(n => n.id !== id);
  saveNotes();
  renderNotes();
}

/**
 * Sanitize text for safe HTML display
 * @param {string} text - Raw text
 * @returns {string} Sanitized text
 */
function sanitizeNoteText(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Render notes to the list
 */
function renderNotes() {
  const list = document.getElementById('notepad-list');
  if (!list) return;
  
  if (notepadState.notes.length === 0) {
    list.innerHTML = '<p class="text-gray-500 text-sm text-center py-2">No tasks yet. Add one above!</p>';
    return;
  }
  
  list.innerHTML = notepadState.notes.map(note => `
    <div class="flex items-start gap-2 p-2 bg-black/30 rounded group hover:bg-black/40 transition-colors">
      <button onclick="toggleNoteComplete(${note.id})" 
              class="mt-0.5 w-5 h-5 rounded border ${note.done ? 'bg-green-500 border-green-400' : 'border-white/40'} flex items-center justify-center text-xs transition-colors">
        ${note.done ? '✓' : ''}
      </button>
      <span class="flex-1 text-sm ${note.done ? 'line-through text-gray-500' : 'text-white'}">${sanitizeNoteText(note.text)}</span>
      <button onclick="deleteNote(${note.id})" 
              class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-sm transition-opacity">
        ✕
      </button>
    </div>
  `).join('');
}

/**
 * Update notepad visibility based on settings
 */
function updateNotepadVisibility() {
  const container = document.getElementById('notepad-container');
  if (!container) return;
  
  if (user_settings.show_notepad === false) {
    container.style.display = 'none';
  } else {
    container.style.display = 'flex';
  }
}

/**
 * Get notepad status
 * @returns {Object} Status object with note count
 */
function getNotepadStatus() {
  const total = notepadState.notes.length;
  const done = notepadState.notes.filter(n => n.done).length;
  return { total, done, pending: total - done };
}
