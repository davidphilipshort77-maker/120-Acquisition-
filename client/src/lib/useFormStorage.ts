// useFormStorage — auto-saves all form field values to localStorage
// keyed by toolId so each tool has its own independent state

import { useState, useEffect, useCallback } from 'react';

export function useFormStorage(toolId: number) {
  const storageKey = `120pct_tool_${toolId}`;

  const [values, setValues] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist to localStorage whenever values change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [values, storageKey]);

  const setValue = useCallback((fieldKey: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldKey]: value }));
  }, []);

  const clearAll = useCallback(() => {
    setValues({});
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  const getValue = useCallback((fieldKey: string, defaultValue = '') => {
    return values[fieldKey] ?? defaultValue;
  }, [values]);

  return { values, setValue, getValue, clearAll };
}
