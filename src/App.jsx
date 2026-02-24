import { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';

function ComingSoon() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-8">
            <QrCode className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Free QR Code Tools
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
            Generate QR codes instantly. Custom colors, logos, download as PNG or SVG.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            No signup. No "premium colors for $3.99/month." It's a QR code, not a luxury good.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
            Coming Soon
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
  return <ComingSoon />;
}

export default App;
