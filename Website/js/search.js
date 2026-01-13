/**
 * Search Bar Module
 * Configurable search that redirects to preferred search engine
 */

/**
 * Available search engines
 */
const SEARCH_ENGINES = {
  duckduckgo: {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q='
  },
  google: {
    name: 'Google',
    url: 'https://www.google.com/search?q='
  },
  bing: {
    name: 'Bing',
    url: 'https://www.bing.com/search?q='
  },
  ecosia: {
    name: 'Ecosia',
    url: 'https://www.ecosia.org/search?q='
  },
  brave: {
    name: 'Brave',
    url: 'https://search.brave.com/search?q='
  }
};

/**
 * Initialize the search bar functionality
 */
function initSearchBar() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const container = document.getElementById('search-container');
  
  if (!form || !input || !container) return;
  
  // Check if search is enabled in settings
  updateSearchVisibility();
  
  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch();
  });
  
  // Handle keyboard shortcuts
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.blur();
      input.value = '';
    }
  });
  
  // Focus search on '/' key (common pattern)
  document.addEventListener('keydown', (e) => {
    // Only if not already focused on an input and modal not active
    if (e.key === '/' && 
        document.activeElement.tagName !== 'INPUT' && 
        document.activeElement.tagName !== 'TEXTAREA' &&
        !modal_active) {
      e.preventDefault();
      input.focus();
    }
  });
}

/**
 * Perform the search with current query
 */
function performSearch() {
  const input = document.getElementById('search-input');
  const query = input.value.trim();
  
  if (!query) return;
  
  const engineKey = user_settings.search_engine || 'duckduckgo';
  const engine = SEARCH_ENGINES[engineKey] || SEARCH_ENGINES.duckduckgo;
  
  const searchUrl = engine.url + encodeURIComponent(query);
  window.location.href = searchUrl;
}

/**
 * Update search bar visibility based on settings
 */
function updateSearchVisibility() {
  const container = document.getElementById('search-container');
  if (!container) return;
  
  if (user_settings.show_search === false) {
    container.style.display = 'none';
  } else {
    container.style.display = 'flex';
  }
}

/**
 * Get list of search engine options for settings dropdown
 * @returns {Array} Array of {value, label} objects
 */
function getSearchEngineOptions() {
  return Object.entries(SEARCH_ENGINES).map(([key, engine]) => ({
    value: key,
    label: engine.name
  }));
}
