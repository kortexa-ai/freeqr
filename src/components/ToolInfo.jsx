import { useEffect } from 'react';

const FAQS = [
  {
    q: 'Is my data uploaded anywhere?',
    a: 'No. QR codes are generated entirely in your browser — nothing is uploaded to any server. That also means your codes never expire: there is no server that could shut down or start charging you.',
  },
  {
    q: 'Can I add a logo to my QR code?',
    a: 'Yes. Upload any image in the Style section and it is placed in the center of the code. Error correction is automatically raised to the highest level (H) so the code stays scannable with a logo covering part of it.',
  },
  {
    q: 'How do WiFi QR codes work?',
    a: 'Pick the WiFi type, enter your network name (SSID), password, and encryption. Scanning the code connects a phone to the network automatically — no typing the password.',
  },
  {
    q: 'Should I download PNG or SVG?',
    a: 'PNG is fine for screens, documents, and most printing. SVG is a vector format that scales to any size without losing sharpness — use it for posters, signage, or professional print work. Both include your logo if you added one.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. No signup, no subscription, no watermark, no scan limits. It runs in your browser, so it costs us almost nothing to host.',
  },
];

export default function ToolInfo() {
  // Inject schema.org FAQPage structured data for search engines
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-10 text-slate-600 dark:text-slate-400">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
        Free QR Code Generator
      </h2>
      <p className="leading-relaxed max-w-3xl">
        Create free QR codes with a logo, custom colors, and dot styles — WiFi QR codes,
        vCard contact cards, URLs, email, SMS, phone numbers, locations, and plain text.
        Download as PNG or SVG, no signup and no watermark. Everything runs in your
        browser, so your data never leaves your device.
      </p>

      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-3">
        How it works
      </h3>
      <ol className="space-y-2 max-w-3xl list-decimal list-inside">
        <li>Pick a type — URL, WiFi, contact card, and more — and fill in the fields.</li>
        <li>Style it: colors, dot shapes, size, and an optional logo in the center.</li>
        <li>Download as PNG or SVG. Done — the code works forever.</li>
      </ol>

      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-3">
        FAQ
      </h3>
      <div className="space-y-5 max-w-3xl">
        {FAQS.map(f => (
          <div key={f.q}>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">{f.q}</h4>
            <p className="text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
