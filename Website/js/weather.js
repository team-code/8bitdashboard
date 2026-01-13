/**
 * Weather Widget Module
 * Privacy-focused weather using Open-Meteo API (no API key required)
 */

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_CACHE_KEY = 'weather_cache';
const WEATHER_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * WMO Weather interpretation codes mapped to emoji icons
 * https://open-meteo.com/en/docs (WMO Weather Codes)
 */
const WEATHER_ICONS = {
  0: '☀️',   // Clear sky
  1: '🌤️',   // Mainly clear
  2: '⛅',   // Partly cloudy
  3: '☁️',   // Overcast
  45: '🌫️',  // Fog
  48: '🌫️',  // Depositing rime fog
  51: '🌧️',  // Light drizzle
  53: '🌧️',  // Moderate drizzle
  55: '🌧️',  // Dense drizzle
  56: '🌧️',  // Light freezing drizzle
  57: '🌧️',  // Dense freezing drizzle
  61: '🌧️',  // Slight rain
  63: '🌧️',  // Moderate rain
  65: '🌧️',  // Heavy rain
  66: '🌨️',  // Light freezing rain
  67: '🌨️',  // Heavy freezing rain
  71: '🌨️',  // Slight snow
  73: '🌨️',  // Moderate snow
  75: '❄️',  // Heavy snow
  77: '❄️',  // Snow grains
  80: '🌦️',  // Slight rain showers
  81: '🌦️',  // Moderate rain showers
  82: '🌦️',  // Violent rain showers
  85: '🌨️',  // Slight snow showers
  86: '🌨️',  // Heavy snow showers
  95: '⛈️',  // Thunderstorm
  96: '⛈️',  // Thunderstorm with slight hail
  99: '⛈️',  // Thunderstorm with heavy hail
};

/**
 * Get weather icon for WMO code
 * @param {number} code - WMO weather code
 * @returns {string} Emoji icon
 */
function getWeatherIcon(code) {
  return WEATHER_ICONS[code] || '❓';
}

/**
 * Get cached weather data if still valid
 * @returns {Object|null} Cached data or null
 */
function getCachedWeather() {
  try {
    const cached = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    const now = Date.now();
    
    if (now - data.timestamp < WEATHER_CACHE_DURATION) {
      return data;
    }
  } catch (e) {
    console.log('Weather cache read error:', e);
  }
  return null;
}

/**
 * Cache weather data
 * @param {Object} weather - Weather data to cache
 */
function cacheWeather(weather) {
  try {
    const data = {
      ...weather,
      timestamp: Date.now()
    };
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.log('Weather cache write error:', e);
  }
}

/**
 * Fetch weather from Open-Meteo API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
async function fetchWeatherFromAPI(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,weather_code',
    temperature_unit: user_settings.weather_fahrenheit ? 'fahrenheit' : 'celsius',
    timezone: 'auto'
  });
  
  const response = await fetch(`${WEATHER_API_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    temp: Math.round(data.current.temperature_2m),
    code: data.current.weather_code,
    unit: user_settings.weather_fahrenheit ? '°F' : '°C',
    lat: lat,
    lon: lon
  };
}

/**
 * Get user's location using Geolocation API
 * @returns {Promise<{lat: number, lon: number}>}
 */
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, maximumAge: 600000 } // 10s timeout, 10min cache
    );
  });
}

/**
 * Update the weather display element
 * @param {Object} weather - Weather data {temp, code, unit}
 */
function updateWeatherDisplay(weather) {
  const weatherEl = document.getElementById('weather-widget');
  if (!weatherEl) return;
  
  const icon = getWeatherIcon(weather.code);
  weatherEl.innerHTML = `${icon} ${weather.temp}${weather.unit}`;
  weatherEl.style.display = 'block';
  weatherEl.title = `Weather (updates every 30 min)`;
}

/**
 * Show weather error/loading state
 * @param {string} message - Message to display
 */
function showWeatherStatus(message) {
  const weatherEl = document.getElementById('weather-widget');
  if (!weatherEl) return;
  
  weatherEl.innerHTML = message;
  weatherEl.style.display = 'block';
}

/**
 * Initialize and fetch weather
 * Called on page load and periodically
 */
async function initWeather() {
  // Check if weather is enabled in settings
  if (user_settings.show_weather === false) {
    const weatherEl = document.getElementById('weather-widget');
    if (weatherEl) weatherEl.style.display = 'none';
    return;
  }
  
  // Check cache first
  const cached = getCachedWeather();
  if (cached) {
    updateWeatherDisplay(cached);
    return;
  }
  
  // Show loading
  showWeatherStatus('🌡️...');
  
  try {
    let lat, lon;
    
    // Use manual location if set, otherwise get from geolocation
    if (user_settings.weather_lat && user_settings.weather_lon) {
      lat = user_settings.weather_lat;
      lon = user_settings.weather_lon;
    } else {
      const location = await getUserLocation();
      lat = location.lat;
      lon = location.lon;
    }
    
    const weather = await fetchWeatherFromAPI(lat, lon);
    cacheWeather(weather);
    updateWeatherDisplay(weather);
    
  } catch (error) {
    console.log('Weather fetch error:', error);
    showWeatherStatus('🌡️❌');
  }
}

/**
 * Refresh weather data (called periodically)
 */
async function refreshWeather() {
  // Clear cache to force refresh
  localStorage.removeItem(WEATHER_CACHE_KEY);
  await initWeather();
}

// Auto-refresh weather every 30 minutes
setInterval(refreshWeather, WEATHER_CACHE_DURATION);
