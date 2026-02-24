import { useState, useCallback } from 'react';
import { deriveLabel } from '../utils/formatters';

const HISTORY_KEY = 'freeqr_history';
const MAX_ITEMS = 50;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(items) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save history:', e);
  }
}

/**
 * History management: save, load, delete QR entries
 */
export function useQRHistory() {
  const [items, setItems] = useState(loadHistory);
  const [isOpen, setIsOpen] = useState(false);

  const save = useCallback((type, data, style) => {
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type,
      label: deriveLabel(type, data),
      createdAt: new Date().toISOString(),
      data: { type, data: { ...data }, style: { ...style } },
    };
    setItems(prev => {
      const next = [entry, ...prev].slice(0, MAX_ITEMS);
      saveHistory(next);
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setItems(prev => {
      const next = prev.filter(item => item.id !== id);
      saveHistory(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    saveHistory([]);
  }, []);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { items, isOpen, toggle, save, remove, clearAll };
}
