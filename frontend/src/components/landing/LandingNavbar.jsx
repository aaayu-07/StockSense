import { Link } from "react-router-dom";

import BrandMark from "../BrandMark";
import ThemeToggle from "../ThemeToggle";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-full border-b border-gray-200 bg-white/90 px-5 py-3 shadow-md backdrop-blur-md backdrop-contrast-125 dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_20px_60px_rgba(2,6,23,0.45)]">
        <BrandMark to="/" compact className="shrink-0" />

        <nav className="hidden items-center gap-7 text-sm text-gray-700 dark:text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-gray-900 dark:hover:text-white">
            Features
          </a>
          <Link to="/dashboard" className="transition hover:text-gray-900 dark:hover:text-white">
            Dashboard
          </Link>
          <a href="#pricing" className="transition hover:text-gray-900 dark:hover:text-white">
            Pricing
          </a>
          <Link to="/contact" className="transition hover:text-gray-900 dark:hover:text-white">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
