/**
 * Pomodoro Timer Module
 * Focus timer that integrates with the dashboard
 */

/**
 * Refresh pomodoro settings from global user_settings
 */
function refreshPomodoroSettings() {
  if (typeof user_settings !== 'undefined') {
    POMODORO_WORK_DURATION = (user_settings.pomodoro_work_time || 25) * 60;
    POMODORO_BREAK_DURATION = (user_settings.pomodoro_break_time || 5) * 60;
    POMODORO_LONG_BREAK_DURATION = (user_settings.pomodoro_long_break_time || 15) * 60;
    
    // If timer is not running, reset to reflect new times
    if (!pomodoroState.isRunning) {
      // Logic from resetPomodoro but without stopping (already stopped)
      pomodoroState.timeRemaining = pomodoroState.isWorkSession 
        ? POMODORO_WORK_DURATION 
        : POMODORO_BREAK_DURATION;
      updatePomodoroDisplay();
    }
  }
}

// Timer constants
// Timer state
// Durations will be loaded from settings
let POMODORO_WORK_DURATION = 25 * 60;
let POMODORO_BREAK_DURATION = 5 * 60;
let POMODORO_LONG_BREAK_DURATION = 15 * 60;

// Timer state
let pomodoroState = {
  timeRemaining: POMODORO_WORK_DURATION,
  isRunning: false,
  isWorkSession: true,
  sessionsCompleted: 0,
  intervalId: null
};

/**
 * Format seconds to MM:SS display
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatPomodoroTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Initialize the Pomodoro timer UI and functionality
 */
function initPomodoro() {
  const container = document.getElementById('pomodoro-container');
  if (!container) return;
  
  // Check if pomodoro is enabled in settings
  // Check if pomodoro is enabled in settings
  updatePomodoroVisibility();
  
  // Load durations from settings
  refreshPomodoroSettings();
  
  // Set up button handlers
  const startBtn = document.getElementById('pomodoro-start');
  const resetBtn = document.getElementById('pomodoro-reset');
  
  if (startBtn) {
    startBtn.addEventListener('click', togglePomodoro);
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetPomodoro);
  }
  
  // Initial display update
  updatePomodoroDisplay();
}

/**
 * Toggle the timer between running and paused
 */
function togglePomodoro() {
  if (pomodoroState.isRunning) {
    pausePomodoro();
  } else {
    startPomodoro();
  }
}

/**
 * Start the timer
 */
function startPomodoro() {
  if (pomodoroState.isRunning) return;
  
  pomodoroState.isRunning = true;
  updatePomodoroButton();
  
  pomodoroState.intervalId = setInterval(() => {
    pomodoroState.timeRemaining--;
    
    if (pomodoroState.timeRemaining <= 0) {
      pomodoroComplete();
    } else {
      updatePomodoroDisplay();
    }
  }, 1000);
}

/**
 * Pause the timer
 */
function pausePomodoro() {
  if (!pomodoroState.isRunning) return;
  
  pomodoroState.isRunning = false;
  clearInterval(pomodoroState.intervalId);
  pomodoroState.intervalId = null;
  updatePomodoroButton();
}

/**
 * Reset the timer to initial state
 */
function resetPomodoro() {
  pausePomodoro();
  pomodoroState.timeRemaining = pomodoroState.isWorkSession 
    ? POMODORO_WORK_DURATION 
    : POMODORO_BREAK_DURATION;
  updatePomodoroDisplay();
}

/**
 * Handle timer completion
 */
function pomodoroComplete() {
  clearInterval(pomodoroState.intervalId);
  pomodoroState.intervalId = null;
  pomodoroState.isRunning = false;
  
  // Play notification sound
  playPomodoroSound();
  
  if (pomodoroState.isWorkSession) {
    pomodoroState.sessionsCompleted++;
    
    // Long break every 4 sessions
    if (pomodoroState.sessionsCompleted % 4 === 0) {
      pomodoroState.timeRemaining = POMODORO_LONG_BREAK_DURATION;
    } else {
      pomodoroState.timeRemaining = POMODORO_BREAK_DURATION;
    }
    pomodoroState.isWorkSession = false;
  } else {
    pomodoroState.timeRemaining = POMODORO_WORK_DURATION;
    pomodoroState.isWorkSession = true;
  }
  
  updatePomodoroDisplay();
  updatePomodoroButton();
  updatePomodoroLabel();
}

/**
 * Update the timer display
 */
function updatePomodoroDisplay() {
  const display = document.getElementById('pomodoro-time');
  if (display) {
    display.textContent = formatPomodoroTime(pomodoroState.timeRemaining);
  }
}

/**
 * Update the start/pause button text
 */
function updatePomodoroButton() {
  const btn = document.getElementById('pomodoro-start');
  if (btn) {
    btn.textContent = pomodoroState.isRunning ? '⏸️ Pause' : '▶️ Start';
  }
}

/**
 * Update the label to show work/break mode
 */
function updatePomodoroLabel() {
  const label = document.getElementById('pomodoro-label');
  if (label) {
    if (pomodoroState.isWorkSession) {
      label.textContent = '🍅 Focus Time';
      label.className = 'text-red-400 text-sm font-medium';
    } else {
      const isLongBreak = pomodoroState.timeRemaining === POMODORO_LONG_BREAK_DURATION;
      label.textContent = isLongBreak ? '☕ Long Break' : '☕ Short Break';
      label.className = 'text-green-400 text-sm font-medium';
    }
  }
}

/**
 * Play a simple notification sound
 */
function playPomodoroSound() {
  if (user_settings.pomodoro_sound === false) return;
  
  try {
    const audio = new Audio('../sounds/levelup.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => {
      console.warn('Audio play failed (user interaction maybe required or file missing):', e);
      // Fallback to beep if file is missing/error? 
      // For now, adhering to user request for levelup.mp3.
    });
  } catch (e) {
    console.log('Could not play pomodoro sound:', e);
  }
}

/**
 * Update pomodoro visibility based on settings
 */
function updatePomodoroVisibility() {
  const container = document.getElementById('pomodoro-container');
  if (!container) return;
  
  if (user_settings.show_pomodoro === false) {
    container.style.display = 'none';
  } else {
    container.style.display = 'flex';
    updatePomodoroLabel();
  }
}

/**
 * Get current pomodoro status for display
 * @returns {Object} Status object with time, sessions, and mode
 */
function getPomodoroStatus() {
  return {
    timeRemaining: pomodoroState.timeRemaining,
    timeDisplay: formatPomodoroTime(pomodoroState.timeRemaining),
    isRunning: pomodoroState.isRunning,
    isWorkSession: pomodoroState.isWorkSession,
    sessionsCompleted: pomodoroState.sessionsCompleted
  };
}
