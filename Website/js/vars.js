//Settings and vars
let time;
let image;
let img_number;
let active_playlist = null; // null or array of image indices
let active_playlist_index = 0; // Current position in playlist
let modal_active = false;
let user_settings = null;
let first_run = true;
const local_storage_supported = typeof Storage !== "undefined";
const default_clock_font_size = 4;
const default_greeting_font_size = 2;
const app_save_version = 1.5;
const app_version_num = 2;
let auto_change_background_active = false;
let auto_change_background_time = 0;
const debug = true;
const prod_url = "https://8bitdashboard.com/";
const local_url = "http://127.0.0.1/8bitdashboard/Website/html/";
let initial_save_version = 0;

const UserSettings = class {
  constructor(
    users_shortcuts,
    save_version = app_save_version,
    random_seek = false,
    clock_font_size = 1,
    greeting_font_size = 1,
    clock_color = "#FFFFFFFF",
    greeting_color = "#FFFFFFFF",
    hide_greetings = false,
    hide_clock = false,
    text_shadows = true,
    clock24hr = false,
    autochangebackground = false,
    autochangebackgroundtime = 1,
    backgroundfilter = [false, false, false],
    backgroundfilterpick = ["blur", "blur", "blur"],
    backgroundfilterstrength = [1, 1, 1],
    staticbackground = false,
    staticbackgroundid = 1,
    // New weather settings
    show_weather = false,
    weather_fahrenheit = false,
    weather_lat = null,
    weather_lon = null,
    // Search settings
    show_search = true,
    search_engine = "duckduckgo",
    // Pomodoro settings
    show_pomodoro = true,
    pomodoro_work_time = 25,
    pomodoro_break_time = 5,
    pomodoro_long_break_time = 15,
    pomodoro_sound = true,
    // Notepad settings
    show_notepad = false,
    // Playlist startup settings
    staticplaylist = false,
    staticplaylistindex = 0,
    // Favorites as playlist
    useFavoritesAsPlaylist = false,
    // Artist as playlist
    useArtistAsPlaylist = false,
    artistPlaylistIndex = 0,
    // Custom background URL
    custom_background_url = "",
    // CRT effect setting
    crt_effect = false,
    crt_opacity = 100,
  ) {
    this.version = save_version;
    this.random_seek = random_seek;
    this.clock_font_size = clock_font_size;
    this.greetingfontsize = greeting_font_size;
    this.clock_color = clock_color;
    this.greeting_color = greeting_color;
    this.hide_greetings = hide_greetings;
    this.hide_clock = hide_clock;
    this.text_shadows = text_shadows;
    this.users_shortcuts = users_shortcuts;
    this.clock24hr = clock24hr;
    this.autobackgroundtime = autochangebackgroundtime;
    this.autochangebackground = autochangebackground;
    this.backgroundfilter = backgroundfilter;
    this.backgroundfilterpick = backgroundfilterpick;
    this.backgroundfilterstrength = backgroundfilterstrength;
    this.staticbackground = staticbackground;
    this.staticbackgroundid = staticbackgroundid;
    // Playlist startup settings
    this.staticplaylist = staticplaylist;
    this.staticplaylistindex = staticplaylistindex;
    // Favorites as playlist
    this.useFavoritesAsPlaylist = useFavoritesAsPlaylist;
    // Artist as playlist
    this.useArtistAsPlaylist = useArtistAsPlaylist;
    this.artistPlaylistIndex = artistPlaylistIndex;
    // Weather settings
    this.show_weather = show_weather;
    this.weather_fahrenheit = weather_fahrenheit;
    this.weather_lat = weather_lat;
    this.weather_lon = weather_lon;
    // Search settings
    this.show_search = show_search;
    this.search_engine = search_engine;
    // Pomodoro settings
    this.show_pomodoro = show_pomodoro;
    this.pomodoro_work_time = pomodoro_work_time;
    this.pomodoro_break_time = pomodoro_break_time;
    this.pomodoro_long_break_time = pomodoro_long_break_time;
    this.pomodoro_sound = pomodoro_sound;
    // Notepad settings
    this.show_notepad = show_notepad;
    // Custom background URL
    this.custom_background_url = custom_background_url;
    // CRT effect setting
    this.crt_effect = crt_effect;
    this.crt_opacity = crt_opacity;
  }
};

const default_shortcut_map = new Map([
  ["g", "https://www.github.com"],
  ["r", "https://www.reddit.com"],
  ["f", "https://www.facebook.com"],
  ["y", "https://www.youtube.com"],
  ["m", "https://maps.google.com"],
  ["k", "https://www.tiktok.com/"],
  ["w", "https://www.wikipedia.com"],
  ["d", "https://djanes.xyz/"],
  ["t", "https://www.twitter.com"],
  ["b", "https://www.twitch.tv/"],
  ["e", "https://www.ebay.com"],
  ["a", "https://www.amazon.com"],
  ["o", "https://www.google.com"],
  ["p", "https://www.plex.tv/web"],
  ["8", "https://8bitdashboard.com/"],
  ["c", "https://craigslist.org/"],
]);
let background_auto_change_interval = null;
let user_shortcut_map = default_shortcut_map;

// Note: artists, images, and number_of_imgs are now defined in backgrounds-data.js
