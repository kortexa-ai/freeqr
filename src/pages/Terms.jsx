export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          ← Back
        </a>
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Last updated: February 23, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">The Deal</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This is a free QR code generator. Unlimited codes, custom colors, multiple formats.
            No hidden fees, no subscriptions, no "premium features."
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Your Responsibilities</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">You agree to:</p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
            <li>Use the tool for legitimate purposes</li>
            <li>Not generate QR codes for malicious URLs</li>
            <li>Verify your QR codes work before printing them on 10,000 flyers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The tool is provided "as is." We're not responsible for QR codes that
            don't scan, lead to the wrong URL, or get tattooed on someone.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Changes</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We might update these terms occasionally. If we do, we'll update this page.
            Continuing to use the tool means you accept the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Questions?{' '}
            <a
              href="mailto:info@kortexa.ai"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              info@kortexa.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
