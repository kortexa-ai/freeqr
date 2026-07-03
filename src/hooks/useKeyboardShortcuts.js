import { useEffect, useCallback } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * - Ctrl/Cmd + S: Save QR to history
 * - Ctrl/Cmd + D: Toggle dark mode
 * - Ctrl/Cmd + Shift + H: Toggle history panel (Cmd+H is OS-reserved on macOS)
 * - Ctrl/Cmd + /: Show keyboard shortcuts
 */
export function useKeyboardShortcuts({ onSave, onToggleDarkMode, onToggleHistory, onShowShortcuts }) {
  const handleKeyDown = useCallback((e) => {
    const isCtrl = e.ctrlKey || e.metaKey;

    if (!isCtrl) return;

    switch (e.key.toLowerCase()) {
      case 's':
        e.preventDefault();
        onSave?.();
        break;
      case 'd':
        e.preventDefault();
        onToggleDarkMode?.();
        break;
      case 'h':
        if (!e.shiftKey) break;
        e.preventDefault();
        onToggleHistory?.();
        break;
      case '/':
        e.preventDefault();
        onShowShortcuts?.();
        break;
      default:
        break;
    }
  }, [onSave, onToggleDarkMode, onToggleHistory, onShowShortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
