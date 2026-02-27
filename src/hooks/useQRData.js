import { useState, useMemo, useCallback, useEffect } from 'react';
import { DEFAULT_DATA, DEFAULT_STYLE, QR_TYPES, formatQRString } from '../utils/formatters';

/**
 * Manages QR form state: type, data fields, style options, and computed qrString
 */
export function useQRData() {
  const [type, setType] = useState('url');
  const [dataFields, setDataFields] = useState(() => structuredClone(DEFAULT_DATA));
  const [style, setStyle] = useState({ ...DEFAULT_STYLE });

  // Read deep link params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return;

    const linkType = params.get('type');
    const validTypeIds = QR_TYPES.map(t => t.id);
    const resolvedType = linkType && validTypeIds.includes(linkType) ? linkType : 'url';

    // Build fields from remaining params, only for keys that exist in DEFAULT_DATA for this type
    const typeDefaults = DEFAULT_DATA[resolvedType];
    const fields = {};
    for (const key of Object.keys(typeDefaults)) {
      const val = params.get(key);
      if (val != null) fields[key] = val;
    }

    if (Object.keys(fields).length > 0) {
      setType(resolvedType);
      setDataFields(prev => ({
        ...prev,
        [resolvedType]: { ...prev[resolvedType], ...fields },
      }));
    }

    // Clean the URL
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  // Current type's data
  const data = dataFields[type];

  // Computed QR string from current type + data
  const qrString = useMemo(() => formatQRString(type, data), [type, data]);

  const updateField = useCallback((field, value) => {
    setDataFields(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  }, [type]);

  const updateStyle = useCallback((field, value) => {
    setStyle(prev => ({ ...prev, [field]: value }));
  }, []);

  const changeType = useCallback((newType) => {
    setType(newType);
  }, []);

  const reset = useCallback(() => {
    setDataFields(prev => ({
      ...prev,
      [type]: structuredClone(DEFAULT_DATA[type]),
    }));
    setStyle({ ...DEFAULT_STYLE });
  }, [type]);

  // Load a saved entry back into the form
  const loadEntry = useCallback((entry) => {
    const { type: savedType, data: savedData, style: savedStyle } = entry;
    setType(savedType);
    setDataFields(prev => ({
      ...prev,
      [savedType]: { ...savedData },
    }));
    if (savedStyle) setStyle({ ...DEFAULT_STYLE, ...savedStyle });
  }, []);

  return {
    type, data, style, qrString,
    changeType, updateField, updateStyle, reset, loadEntry,
  };
}
