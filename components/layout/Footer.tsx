/* ─────────────────────────────────────────────────────────────
   FOOTER
   Single line: copyright left, social links right.
   Intentionally minimal — no extra clutter.
───────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-canvas px-6 py-6 md:px-10 lg:px-16">
      <div className="mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-text-muted">
          © {year} Attach Studio. Tüm hakları saklıdır.
        </p>

        <nav aria-label="Social links" className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/studioattach"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="label text-text-muted hover:text-text transition-colors duration-200"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/company/studioattach/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="label text-text-muted hover:text-text transition-colors duration-200"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
