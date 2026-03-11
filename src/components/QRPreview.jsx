import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download } from 'lucide-react';
import SendToMenu from './SendToMenu';

// Singleton instance - reuse and update rather than recreate
let qrInstance = null;

function getQR(options) {
  if (!qrInstance) {
    qrInstance = new QRCodeStyling(options);
  } else {
    qrInstance.update(options);
  }
  return qrInstance;
}

export default function QRPreview({ qrString, style }) {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  const options = {
    width: style.size,
    height: style.size,
    data: qrString || ' ',
    dotsOptions: { type: style.dotStyle, color: style.fgColor },
    backgroundOptions: { color: style.bgColor },
    cornersSquareOptions: { color: style.fgColor },
    cornersDotOptions: { color: style.fgColor },
    qrOptions: {
      errorCorrectionLevel: style.errorCorrection || 'M',
      typeNumber: style.qrVersion || 0,
    },
  };

  // Mount QR instance into the container once
  useEffect(() => {
    if (!containerRef.current || mountedRef.current) return;
    mountedRef.current = true;
    const qr = getQR(options);
    containerRef.current.innerHTML = '';
    qr.append(containerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update QR when options change
  useEffect(() => {
    if (!mountedRef.current) return;
    getQR(options);
  }, [qrString, style.dotStyle, style.fgColor, style.bgColor, style.size, style.errorCorrection, style.qrVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Generate a File on demand for SendToMenu
  const getFile = async () => {
    const qr = getQR(options);
    const blob = await qr.getRawData('png');
    if (!blob) return null;
    return new File([blob], 'qrcode.png', { type: 'image/png' });
  };

  const handleDownload = (ext) => {
    const qr = getQR(options);
    qr.download({ extension: ext });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* QR Code display */}
      <div
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-600 inline-flex items-center justify-center"
        style={{ minWidth: Math.min(style.size + 48, 320), minHeight: Math.min(style.size + 48, 320) }}
      >
        <div
          ref={containerRef}
          className="flex items-center justify-center [&>canvas]:!max-w-full [&>canvas]:!h-auto [&>svg]:!max-w-full [&>svg]:!h-auto"
          style={{ maxWidth: 272 }}
        />
      </div>

      {/* Download buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleDownload('png')}
          disabled={!qrString}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          PNG
        </button>
        <button
          onClick={() => handleDownload('svg')}
          disabled={!qrString}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          SVG
        </button>
        {qrString && <SendToMenu getFile={getFile} fileType="image" />}
      </div>
    </div>
  );
}
