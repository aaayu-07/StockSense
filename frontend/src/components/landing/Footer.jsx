import { Link } from "react-router-dom";

import BrandMark from "../BrandMark";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.34 2.74-1.06 2.74-1.06.55 1.41.2 2.46.1 2.72.64.73 1.03 1.65 1.03 2.78 0 3.98-2.35 4.85-4.59 5.11.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.03c0 1.12.9 2.03 2.01 2.03h.02a2.03 2.03 0 0 0 .02-4.06ZM20.8 12.77c0-3.09-1.65-4.53-3.86-4.53-1.78 0-2.58.99-3.02 1.68V8.5h-3.38c.04.95 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.35 0 1.9 1.04 1.9 2.57V20H21s.05-5.88.05-7.23Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="rounded-[2rem] border-t border-gray-200 bg-gray-100 px-6 py-10 text-gray-400 dark:border-white/10 dark:bg-slate-900">
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <BrandMark to="/" showTagline />
          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600 dark:text-slate-400">
            A data-driven platform for stock insights, analytics, and smarter decision-making.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white">
            Navigation
          </h3>
          <div className="mt-5 space-y-3 text-sm">
            <Link to="/" className="block text-gray-600 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
              Home
            </Link>
            <Link to="/dashboard" className="block text-gray-600 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
              Dashboard
            </Link>
            <a href="/#features" className="block text-gray-600 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
              Features
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white">
            Legal
          </h3>
          <div className="mt-5 space-y-3 text-sm">
            <Link to="/privacy" className="block text-gray-600 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="block text-gray-600 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link to="/contact" className="block text-gray-600 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-5 text-sm text-gray-500 dark:border-white/10 dark:text-slate-500">
        © 2026 StockSense. Built for clarity, confidence, and market intelligence.
      </div>
    </footer>
  );
}
