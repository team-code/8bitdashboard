/**
 * Touch Gestures Module
 * Enhanced touch/swipe detection for mobile devices
 */

// Touch state tracking
let touchState = {
  startX: 0,
  startY: 0,
  startTime: 0,
  isTracking: false
};

// Configuration
const SWIPE_CONFIG = {
  minSwipeDistance: 50,   // Minimum distance in px to register as swipe
  maxSwipeTime: 500,      // Maximum time in ms for a valid swipe
  maxVerticalRatio: 0.5   // Max ratio of vertical to horizontal distance
};

/**
 * Initialize touch gestures
 */
function initTouchGestures() {
  // Initialize on body for full-screen swipe support
  const touchArea = document.body;
  
  touchArea.addEventListener('touchstart', handleTouchStart, { passive: true });
  touchArea.addEventListener('touchend', handleTouchEnd, { passive: true });
  touchArea.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  
  console.log('[TouchGestures] Initialized full-screen swipe gestures');
}

/**
 * Handle touch start
 * @param {TouchEvent} event
 */
function handleTouchStart(event) {
  // Don't track if touching interactive elements
  const target = event.target;
  if (isInteractiveElement(target)) {
    touchState.isTracking = false;
    return;
  }
  
  const touch = event.touches[0];
  touchState.startX = touch.clientX;
  touchState.startY = touch.clientY;
  touchState.startTime = Date.now();
  touchState.isTracking = true;
}

/**
 * Handle touch end - detect swipe
 * @param {TouchEvent} event
 */
function handleTouchEnd(event) {
  if (!touchState.isTracking) return;
  
  const touch = event.changedTouches[0];
  const endX = touch.clientX;
  const endY = touch.clientY;
  const endTime = Date.now();
  
  // Calculate deltas
  const deltaX = endX - touchState.startX;
  const deltaY = endY - touchState.startY;
  const deltaTime = endTime - touchState.startTime;
  
  // Check if this is a valid swipe
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  
  if (
    absX >= SWIPE_CONFIG.minSwipeDistance &&
    deltaTime <= SWIPE_CONFIG.maxSwipeTime &&
    absY / absX <= SWIPE_CONFIG.maxVerticalRatio
  ) {
    // Valid horizontal swipe
    if (deltaX > 0) {
      onSwipeRight();
    } else {
      onSwipeLeft();
    }
  }
  
  // Reset state
  touchState.isTracking = false;
}

/**
 * Handle touch cancel
 */
function handleTouchCancel() {
  touchState.isTracking = false;
}

/**
 * Check if an element is interactive (should ignore swipes)
 * @param {Element} element
 * @returns {boolean}
 */
function isInteractiveElement(element) {
  if (!element) return false;
  
  const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT', 'A'];
  const interactiveClasses = ['modal', 'modal-content', 'notepad-panel'];
  
  // Check current element
  if (interactiveTags.includes(element.tagName)) return true;
  
  // Check if inside interactive container
  let current = element;
  while (current && current !== document.body) {
    if (interactiveTags.includes(current.tagName)) return true;
    
    // Check for interactive classes
    for (const className of interactiveClasses) {
      if (current.classList && current.classList.contains(className)) return true;
    }
    
    // Check if modal is open
    if (current.id === 'myModal' && current.style.display !== 'none') return true;
    if (current.id === 'modaltext') return true;
    
    current = current.parentElement;
  }
  
  return false;
}

/**
 * Handle swipe right (show previous image)
 */
function onSwipeRight() {
  console.log('[TouchGestures] Swipe Right detected');
  
  // Provide haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
  
  if (typeof user_settings !== 'undefined' && user_settings.random_seek) {
    setRandomImage();
  } else {
    previousImage();
  }
}

/**
 * Handle swipe left (show next image)
 */
function onSwipeLeft() {
  console.log('[TouchGestures] Swipe Left detected');
  
  // Provide haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
  
  if (typeof user_settings !== 'undefined' && user_settings.random_seek) {
    setRandomImage();
  } else {
    nextImage();
  }
}
