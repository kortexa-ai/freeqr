import { X, Trash2, Clock } from 'lucide-react';
import { QR_TYPES } from '../utils/formatters';

function typeLabel(typeId) {
  return QR_TYPES.find(t => t.id === typeId)?.label || typeId;
}

export default function QRHistoryPanel({ isOpen, items, onClose, onLoad, onRemove, onClearAll }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4" />
            History
          </h2>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-57px)] p-3 space-y-2">
          {items.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">
              No saved QR codes yet. Hit "Save" to keep one here.
            </p>
          )}

          {items.map(item => (
            <div
              key={item.id}
              className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
              onClick={() => { onLoad(item.data); onClose(); }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-0.5">
                  {typeLabel(item.type)}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 truncate">
                  {item.label}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
