/**
 * Common timeout durations (in milliseconds)
 * Used across the app to ensure consistent UX and easier tuning.
 */
export const TIMEOUTS = {
  EXTRA_SHORT: 100,
  SHORT: 200, // Quick UI updates, small delays
  MEDIUM: 300, // Debounce or small modal animations
  LONG: 500, // For data-dependent UI changes or WebView readiness
  EXTRA_LONG: 1000, // Rare: for heavy transitions or network fallbacks

  // Specific context-based constants (semantic)
  READER_SELECTION_DELAY: 300, // Delay before showing selection modal
  READER_THEME_APPLY_DELAY: 500, // Ensure WebView ready before applying theme
  BOOK_STATE_DEBOUNCE_DELAY: 300 // Debounce when saving reading state
} as const;
