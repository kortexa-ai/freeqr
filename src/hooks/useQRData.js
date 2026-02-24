import { useState, useMemo, useCallback } from 'react';
import { DEFAULT_DATA, DEFAULT_STYLE, formatQRString } from '../utils/formatters';

/**
 * Manages QR form state: type, data fields, style options, and computed qrString
 */
export function useQRData() {
  const [type, setType] = useState('url');
  const [dataFields, setDataFields] = useState(() => structuredClone(DEFAULT_DATA));
  const [style, setStyle] = useState({ ...DEFAULT_STYLE });

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
