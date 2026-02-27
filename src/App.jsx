import { useState, useEffect, useCallback } from 'react';
import { Save, RotateCcw, ExternalLink } from 'lucide-react';

const toolUrl = (domain) => {
  if (window.location.hostname !== 'localhost') return `https://${domain}`;
  const ports = { 'freebusinesscards.xyz': 8101 };
  return ports[domain] ? `https://localhost:${ports[domain]}` : `https://${domain}`;
};
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import FreeTools from './pages/FreeTools';
import Header from './components/Header';
import QRForm from './components/QRForm';
import QRPreview from './components/QRPreview';
import QRHistoryPanel from './components/QRHistoryPanel';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import { useDarkMode } from './hooks/useDarkMode';
import { useQRData } from './hooks/useQRData';
import { useQRHistory } from './hooks/useQRHistory';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function QRApp() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { type, data, style, qrString, changeType, updateField, updateStyle, reset, loadEntry } = useQRData();
  const history = useQRHistory();
  const [showShortcuts, setShowShortcuts] = useState(false);

  const toggleShortcuts = useCallback(() => setShowShortcuts(prev => !prev), []);

  useKeyboardShortcuts({
    onSave: () => history.save(type, data, style),
    onToggleDarkMode: toggleDarkMode,
    onToggleHistory: history.toggle,
    onReset: reset,
    onShowShortcuts: toggleShortcuts,
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onShowShortcuts={toggleShortcuts}
        onHistoryToggle={history.toggle}
        historyCount={history.items.length}
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Actions bar */}
        <div className="flex items-center mb-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          {type === 'contact' && (data.firstName || data.lastName || data.email || data.phone) && (() => {
            const fields = { firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone };
            const qs = Object.entries(fields)
              .filter(([, v]) => v)
              .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
              .join('&');
            return qs ? (
              <a
                href={`${toolUrl('freebusinesscards.xyz')}/?${qs}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors ml-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Make Business Card
              </a>
            ) : null;
          })()}
          <button
            onClick={() => history.save(type, data, style)}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors${type === 'contact' && (data.firstName || data.lastName || data.email || data.phone) ? ' ml-2' : ' ml-auto'}`}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6">
              <QRForm
                type={type}
                data={data}
                style={style}
                changeType={changeType}
                updateField={updateField}
                updateStyle={updateStyle}
              />
            </div>
          </div>

          {/* Preview - sticky on desktop */}
          <div className="lg:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-20">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6">
                <QRPreview qrString={qrString} style={style} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Made by{' '}
              <a
                href="https://kortexa.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                kortexa.ai
              </a>
            </p>
            <p className="flex items-center gap-2">
              <a href="/about" className="hover:text-slate-700 dark:hover:text-slate-200">About</a>
              <span>·</span>
              <a href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-200">Privacy</a>
              <span>·</span>
              <a href="/terms" className="hover:text-slate-700 dark:hover:text-slate-200">Terms</a>
            </p>
          </div>
        </div>
      </footer>

      <QRHistoryPanel
        isOpen={history.isOpen}
        items={history.items}
        onClose={history.toggle}
        onLoad={loadEntry}
        onRemove={history.remove}
        onClearAll={history.clearAll}
      />

      <KeyboardShortcutsHelp isOpen={showShortcuts} onClose={toggleShortcuts} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-200 dark:text-slate-700">404</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Page not found</p>
        <a href="/" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">Go home</a>
      </div>
    </div>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (path === '/privacy') return <Privacy />;
  if (path === '/terms') return <Terms />;
  if (path === '/about') return <About />;
  if (path === '/freetools') return <FreeTools />;
  if (path !== '/') return <NotFound />;
  return <QRApp />;
}

export default App;
