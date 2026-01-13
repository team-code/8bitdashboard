/**
 * Settings Modal Module
 * Modern Tailwind-styled settings panel for 8-bit Dashboard
 * Uses template literals and safe DOM manipulation to prevent XSS
 */

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Builds the shortcuts section HTML
 * @returns {string} HTML string
 */
function buildShortcutsSection() {
  let shortcutRows = '';
  user_shortcut_map.forEach((value, key) => {
    shortcutRows += `
      <div class="shortcut-row flex items-center gap-2 mb-2">
        <input type="text" value="${escapeHtml(key)}" maxlength="1" 
               class="shortcutkey w-12 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-center text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
               title="Shortcut Key">
        <input type="text" value="${escapeHtml(value)}" 
               class="shortcutvalue flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
               title="Shortcut Website">
        <button type="button" onclick="deleteShortcutRow(this)" 
                class="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded text-white font-bold transition-colors">
          ×
        </button>
      </div>
    `;
  });

  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">⌨️ Shortcuts</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1">
        <div id="shortcuts-container">
          ${shortcutRows}
        </div>
        <button type="button" onclick="addNewShortcutRow()" 
                class="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white transition-colors">
          + Add Shortcut
        </button>
      </div>
    </details>
  `;
}

/**
 * Builds the clock settings section
 * @returns {string} HTML string
 */
function buildClockSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🕐 Clock</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label for="clockcolor" class="text-gray-300">Clock Color</label>
          <input id="clockcolor" value="${escapeHtml(user_settings.clock_color)}" data-jscolor="{}" 
                 class="w-24 h-10 px-2 bg-gray-700 border border-gray-600 rounded cursor-pointer">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Show Clock</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="clockcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">24-Hour Format</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="24hrcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label for="clockfontsize" class="text-gray-300">Clock Size</label>
          <input type="number" id="clockfontsize" min="0.5" max="3" step="0.1" value="1" 
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center focus:ring-2 focus:ring-purple-500">
        </div>
      </div>
    </details>
  `;
}

/**
 * Builds the weather settings section
 * @returns {string} HTML string
 */
function buildWeatherSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🌤️ Weather</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Show Weather</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="weathercheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Use Fahrenheit</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="weatherfahrenheitcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <p class="text-gray-500 text-sm">
          Weather uses your location (requires permission). No tracking - uses Open-Meteo API.
        </p>
      </div>
    </details>
  `;
}

/**
 * Builds the search settings section
 * @returns {string} HTML string
 */
function buildSearchSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🔍 Search</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Show Search Bar</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="searchcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label for="searchengine" class="text-gray-300">Search Engine</label>
          <select id="searchengine" class="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-purple-500">
            <option value="duckduckgo">DuckDuckGo</option>
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="ecosia">Ecosia</option>
            <option value="brave">Brave</option>
          </select>
        </div>
        <p class="text-gray-500 text-sm">
          Press '/' to focus the search bar. Privacy-friendly DuckDuckGo is the default.
        </p>
      </div>
    </details>
  `;
}

/**
 * Builds the pomodoro settings section
 * @returns {string} HTML string
 */
function buildPomodoroSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🍅 Pomodoro Timer</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Show Pomodoro Timer</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="pomodorocheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Work Duration (min)</label>
          <input type="number" id="pomodoroWork" min="1" max="60" value="25"
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-center text-white focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Short Break (min)</label>
          <input type="number" id="pomodoroBreak" min="1" max="30" value="5"
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-center text-white focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Long Break (min)</label>
          <input type="number" id="pomodoroLongBreak" min="1" max="60" value="15"
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-center text-white focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Play Sound</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="pomodorosoundcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <p class="text-gray-500 text-sm">
          Customize your focus sessions. Long break occurs every 4 sessions.
        </p>
      </div>
    </details>
  `;
}

/**
 * Builds the notepad settings section
 * @returns {string} HTML string
 */
function buildNotepadSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">📝 To-Do</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Show To-Do Widget</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="notepadcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <p class="text-gray-500 text-sm">
          To-Do list. Saved locally in your browser. Press Enter to add tasks.
        </p>
      </div>
    </details>
  `;
}

/**
 * Builds the greeting settings section
 * @returns {string} HTML string
 */
function buildGreetingSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">👋 Greeting</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label for="greetingcolor" class="text-gray-300">Greeting Color</label>
          <input id="greetingcolor" value="${escapeHtml(user_settings.greeting_color)}" data-jscolor="{}" 
                 class="w-24 h-10 px-2 bg-gray-700 border border-gray-600 rounded cursor-pointer">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Show Greeting</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="greetingscheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label for="greetingfontsize" class="text-gray-300">Greeting Size</label>
          <input type="number" id="greetingfontsize" min="0.5" max="3" step="0.1" value="1" 
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center focus:ring-2 focus:ring-purple-500">
        </div>
      </div>
    </details>
  `;
}

/**
 * Builds the background settings section
 * @returns {string} HTML string
 */
function buildPlaylistOptions() {
  if (typeof gallerySystem === 'undefined' || !gallerySystem.playlists) return '<option value="">No Playlists Found</option>';
  if (gallerySystem.playlists.length === 0) return '<option value="">No Playlists Created</option>';
  
  return gallerySystem.playlists.map((pl, index) => 
    `<option value="${index}">${escapeHtml(pl.name)} (${pl.items.length})</option>`
  ).join('');
}

function buildBackgroundSection() {
  const playlistOptions = buildPlaylistOptions();

  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🖼️ Background</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Random Image on Arrow Keys</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="randomimagecheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Auto Change Background</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="autochangebackgroundcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div id="autochange-minutes-row" class="flex items-center justify-between">
          <label for="changeminutesinput" class="text-gray-300">Change every X minutes</label>
          <input type="number" id="changeminutesinput" min="0.5" max="1440" step="0.5" value="1" 
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Fixed Startup Background</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="startupbackgroundcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <input type="number" id="startupimageinput" min="1" step="1" value="1" 
                 class="w-20 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center focus:ring-2 focus:ring-purple-500">
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Fixed Startup Playlist</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="startupplaylistcheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div id="startup-playlist-row" class="flex items-center justify-between" style="display:none;">
          <label for="startupplaylistselect" class="text-gray-300">Select Playlist</label>
          <select id="startupplaylistselect" class="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-purple-500">
            ${playlistOptions}
          </select>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-300">Current Image #</span>
          <span id="current_image_number" class="text-purple-400 font-mono">0</span>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-700">
          <label for="custombackgroundurl" class="block text-gray-300 mb-2">Custom Background URL</label>
          <input type="url" id="custombackgroundurl" 
                 class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                 placeholder="https://example.com/image.jpg">
          <p class="text-gray-500 text-xs mt-2">
            Enter an image URL to use as a custom background. Leave empty to use default backgrounds. Supports .gif, .jpg, .png, and .webp.
          </p>
        </div>
      </div>
    </details>
  `;
}

/**
 * Builds a single filter row
 * @param {number} index - Filter index (1-3)
 * @returns {string} HTML string
 */
function buildFilterRow(index) {
  return `
    <div class="p-3 bg-gray-700/50 rounded-lg space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-gray-300 font-medium">Filter ${index}</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="filterscheckmark${index}" class="filtercheckmark sr-only peer">
          <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>
      <div class="flex items-center gap-3">
        <select id="filterlist${index}" class="filterlist flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-purple-500">
          <option value="blur">Blur</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
          <option value="grayscale">Grayscale</option>
          <option value="hue-rotate">Hue Rotate</option>
          <option value="invert">Invert</option>
          <option value="opacity">Opacity</option>
          <option value="saturate">Saturate</option>
          <option value="sepia">Sepia</option>
        </select>
        <input type="number" id="backgroundfilterstrength${index}" min="1" max="100" step="1" value="1" 
               class="filterstrength w-20 px-2 py-2 bg-gray-600 border border-gray-500 rounded text-white text-center focus:ring-2 focus:ring-purple-500">
      </div>
    </div>
  `;
}

/**
 * Builds the filters section
 * @returns {string} HTML string
 */
function buildFiltersSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🎨 Background Filters</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-3">
        ${buildFilterRow(1)}
        ${buildFilterRow(2)}
        ${buildFilterRow(3)}
      </div>
    </details>
  `;
}

/**
 * Builds the accessibility section
 * @returns {string} HTML string
 */
function buildAccessibilitySection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">♿ Accessibility & Effects</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Text Shadows</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="textshadowscheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-300">CRT Scanline Effect</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="fx-toggle" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div id="fx-intensity-container" class="flex flex-col gap-2 pl-4 border-l-2 border-gray-700 mt-2" style="display: none;">
          <div class="flex items-center justify-between">
            <label for="fx-intensity" class="text-gray-300 text-sm">Effect Intensity</label>
            <span id="fx-intensity-val" class="text-purple-400 text-sm font-mono">100%</span>
          </div>
          <input type="range" id="fx-intensity" min="0" max="100" step="5" value="100" 
                 class="w-full h-4 bg-gray-700 rounded-lg cursor-pointer accent-purple-500"
                 oninput="document.getElementById('fx-intensity-val').textContent = this.value + '%'">
        </div>
        <p class="text-gray-500 text-sm">
          Adds retro CRT monitor scanlines and subtle screen flicker for an authentic 8-bit experience.
        </p>
      </div>
    </details>
  `;
}

/**
 * Builds the sharing section
 * @returns {string} HTML string
 */
function buildSharingSection() {
  return `
    <details class="group">
      <summary class="flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
        <span class="text-lg font-semibold">🔗 Share Settings</span>
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </summary>
      <div class="p-4 bg-gray-800/50 rounded-b-lg mt-1 space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-300">Include Shortcuts</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="bookmarkscheckmark" class="sr-only peer">
            <div class="w-14 h-8 bg-gray-600 peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div>
          <label class="text-gray-300 block mb-2">Your Settings URL</label>
          <div class="relative">
            <input type="text" id="settingsurl" readonly 
                   class="w-full px-3 py-2 pr-20 bg-gray-700 border border-gray-600 rounded text-gray-300 text-sm cursor-pointer focus:ring-2 focus:ring-purple-500"
                   onclick="copySettingsURL()">
            <span id="copyAlert" class="absolute right-2 top-1/2 -translate-y-1/2 text-green-400 text-sm opacity-0 transition-opacity">Copied!</span>
          </div>
        </div>
      </div>
    </details>
  `;
}

/**
 * Builds the complete settings modal content
 * @returns {string} HTML string
 */
function buildSettingsModalContent() {
  return `
    <div class="bg-gray-900 text-gray-100 p-6 rounded-2xl w-full max-w-6xl mx-auto shadow-2xl border border-gray-700 font-minecraft max-h-[95vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">⚙️ Settings</h2>
        <button class="close text-3xl text-gray-400 hover:text-white transition-colors leading-none">&times;</button>
      </div>
      <div class="space-y-3">
        ${buildShortcutsSection()}
        ${buildSearchSection()}
        ${buildPomodoroSection()}
        ${buildNotepadSection()}
        ${buildWeatherSection()}
        ${buildClockSection()}
        ${buildGreetingSection()}
        ${buildBackgroundSection()}
        ${buildFiltersSection()}
        ${buildAccessibilitySection()}
        ${buildSharingSection()}
      </div>
      <div class="mt-6 pt-4 border-t border-gray-700 flex flex-wrap gap-3">
        <button type="button" onclick="saveBTN()" 
                class="flex-1 min-w-[120px] px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-purple-500/25">
          💾 Save
        </button>
        <button type="button" onclick="resetUserSettings(true);closemodel()" 
                class="flex-1 min-w-[120px] px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors">
          🔄 Reset
        </button>
      </div>
    </div>
  `;
}

/**
 * Adds a new empty shortcut row to the container
 */
function addNewShortcutRow() {
  const container = document.getElementById('shortcuts-container');
  const newRow = document.createElement('div');
  newRow.className = 'shortcut-row flex items-center gap-2 mb-2';
  newRow.innerHTML = `
    <input type="text" value="" maxlength="1" 
           class="shortcutkey w-12 px-2 py-2 bg-gray-700 border border-gray-600 rounded text-center text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
           title="Shortcut Key">
    <input type="text" value="" 
           class="shortcutvalue flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
           title="Shortcut Website">
    <button type="button" onclick="deleteShortcutRow(this)" 
            class="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded text-white font-bold transition-colors">
      ×
    </button>
  `;
  container.appendChild(newRow);
}

/**
 * Deletes a shortcut row from the container
 * @param {HTMLElement} button - The delete button that was clicked
 */
function deleteShortcutRow(button) {
  const row = button.closest('.shortcut-row');
  if (row) {
    row.remove();
  }
}

/**
 * Copies the settings URL to clipboard and shows feedback
 */
function copySettingsURL() {
  const input = document.getElementById('settingsurl');
  navigator.clipboard.writeText(input.value);
  
  const alert = document.getElementById('copyAlert');
  alert.style.opacity = '1';
  setTimeout(() => {
    alert.style.opacity = '0';
  }, 2000);
  
  input.select();
}

/**
 * Updates the settings modal to show current settings values
 * Called after the modal content is inserted into the DOM
 */
function populateSettingsValues() {
  // Weather settings
  if (user_settings.show_weather !== false) {
    document.getElementById('weathercheckmark').checked = true;
  }
  if (user_settings.weather_fahrenheit) {
    document.getElementById('weatherfahrenheitcheckmark').checked = true;
  }

  // Search settings
  if (user_settings.show_search !== false) {
    document.getElementById('searchcheckmark').checked = true;
  }
  document.getElementById('searchengine').value = user_settings.search_engine || 'duckduckgo';

  // Pomodoro settings
  if (user_settings.show_pomodoro !== false) {
    document.getElementById('pomodorocheckmark').checked = true;
  }
  document.getElementById('pomodoroWork').value = user_settings.pomodoro_work_time || 25;
  document.getElementById('pomodoroBreak').value = user_settings.pomodoro_break_time || 5;
  document.getElementById('pomodoroLongBreak').value = user_settings.pomodoro_long_break_time || 15;
  
  if (user_settings.pomodoro_sound !== false) {
    document.getElementById('pomodorosoundcheckmark').checked = true;
  }

  // Notepad settings
  if (user_settings.show_notepad !== false) {
    document.getElementById('notepadcheckmark').checked = true;
  }

  // Clock settings
  if (!user_settings.hide_clock) {
    document.getElementById('clockcheckmark').checked = true;
  }
  if (user_settings.clock24hr) {
    document.getElementById('24hrcheckmark').checked = true;
  }
  document.getElementById('clockfontsize').value = user_settings.clock_font_size;

  // Greeting settings
  if (!user_settings.hide_greetings) {
    document.getElementById('greetingscheckmark').checked = true;
  }
  document.getElementById('greetingfontsize').value = user_settings.greetingfontsize;

  // Background settings
  if (user_settings.random_seek) {
    document.getElementById('randomimagecheckmark').checked = true;
  }
  if (user_settings.autochangebackground) {
    document.getElementById('autochangebackgroundcheckmark').checked = true;
  }
  document.getElementById('changeminutesinput').value = user_settings.autobackgroundtime;
  if (user_settings.staticbackground) {
    document.getElementById('startupbackgroundcheckmark').checked = true;
  }
  document.getElementById('startupimageinput').value = user_settings.staticbackgroundid;
  
  if (user_settings.staticplaylist) {
    document.getElementById('startupplaylistcheckmark').checked = true;
    document.getElementById('startup-playlist-row').style.display = 'flex';
  }
  if (user_settings.staticplaylistindex !== undefined) {
    document.getElementById('startupplaylistselect').value = user_settings.staticplaylistindex;
  }
  
  document.getElementById('current_image_number').textContent = img_number;
  document.getElementById('custombackgroundurl').value = user_settings.custom_background_url || '';

  // Filter settings
  user_settings.backgroundfilter.forEach((isOn, i) => {
    if (isOn) {
      document.getElementById(`filterscheckmark${i + 1}`).checked = true;
    }
  });
  user_settings.backgroundfilterpick.forEach((value, i) => {
    document.getElementById(`filterlist${i + 1}`).value = value;
  });
  user_settings.backgroundfilterstrength.forEach((value, i) => {
    document.getElementById(`backgroundfilterstrength${i + 1}`).value = value;
  });

  // Accessibility settings
  if (user_settings.text_shadows) {
    document.getElementById('textshadowscheckmark').checked = true;
  }
  if (user_settings.crt_effect) {
    document.getElementById('fx-toggle').checked = true;
    document.getElementById('fx-intensity-container').style.display = 'flex';
  }
  
  if (user_settings.crt_opacity !== undefined) {
    const opacityVal = user_settings.crt_opacity;
    document.getElementById('fx-intensity').value = opacityVal;
    document.getElementById('fx-intensity-val').textContent = opacityVal + '%';
  }

  // Initial visibility check
  const crtCheck = document.getElementById('fx-toggle');
  document.getElementById('fx-intensity-container').style.display = crtCheck.checked ? 'flex' : 'none';

  // Auto-change minutes visibility
  const autoChangeCheck = document.getElementById('autochangebackgroundcheckmark');
  const autoChangeRow = document.getElementById('autochange-minutes-row');
  autoChangeRow.style.display = autoChangeCheck.checked ? 'flex' : 'none';
  
  // Sharing URL update
  updateSettingsURLInput();
}

/**
 * Attaches event listeners for settings modal interactions.
 * This should only be called once when the app starts.
 */
function setupSettingsListeners() {
  document.addEventListener('change', (e) => {
    if (e.target.id === 'fx-toggle') {
      document.getElementById('fx-intensity-container').style.display = e.target.checked ? 'flex' : 'none';
    }
    if (e.target.id === 'autochangebackgroundcheckmark') {
      const row = document.getElementById('autochange-minutes-row');
      if (row) row.style.display = e.target.checked ? 'flex' : 'none';
    }
    if (e.target.id === 'startupplaylistcheckmark') {
      const row = document.getElementById('startup-playlist-row');
      if (row) row.style.display = e.target.checked ? 'flex' : 'none';
      if (e.target.checked) {
         // Auto-uncheck fixed static background if playlist is selected to avoid confusion
         const staticBgCheck = document.getElementById('startupbackgroundcheckmark');
         if(staticBgCheck && staticBgCheck.checked) staticBgCheck.click();
      }
    }
    if (e.target.id === 'startupbackgroundcheckmark') {
      if (e.target.checked) {
         // Auto-uncheck playlist if static background is selected
         const playlistCheck = document.getElementById('startupplaylistcheckmark');
         if(playlistCheck && playlistCheck.checked) playlistCheck.click();
      }
    }
  });
  
  // Update sharing URL when bookmark toggle changes
  document.addEventListener('change', (e) => {
    if (e.target.id === 'bookmarkscheckmark') {
      updateSettingsURLInput();
    }
  });
}

// Initial setup
setupSettingsListeners();

/**
 * Renders the new settings modal and sets up event handlers
 * This replaces the old settingsModelContent function
 */
function renderNewSettingsModal() {
  const modalText = document.getElementById('modaltext');
  modalText.innerHTML = buildSettingsModalContent();
  
  // Re-initialize jscolor for color pickers
  jscolor.install();
  
  // Setup close button
  const closeBtn = modalText.querySelector('.close');
  closeBtn.onclick = () => {
    modal.style.display = 'none';
    modal_active = false;
  };
  
  // Populate all values
  populateSettingsValues();
  
  // Attach live preview listeners
  attachLivePreviewListeners();
}

/**
 * Attaches event listeners for live preview of background filters
 */
function attachLivePreviewListeners() {
  const filterElements = document.querySelectorAll('.filtercheckmark, .filterlist, .filterstrength');
  filterElements.forEach(el => {
    el.addEventListener('input', () => {
      backgroundfilters(false);
    });
    el.addEventListener('change', () => {
      backgroundfilters(false);
    });
  });
}
