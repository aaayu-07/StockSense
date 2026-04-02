import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import BrandMark from "../BrandMark";
import ThemeToggle from "../ThemeToggle";

export default function DashboardNavbar({ onMenuToggle }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-40"
    >
      <div className="rounded-[1.8rem] border-b border-gray-200 bg-white/90 px-4 py-3 shadow-md backdrop-blur-md backdrop-contrast-125 dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMenuToggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-800 transition hover:border-blue-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 lg:hidden"
              aria-label="Open dashboard navigation"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <BrandMark to="/" compact />
              <div className="hidden sm:block">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">Control Center</p>
                <h1 className="text-base font-semibold text-slate-950 dark:text-white">Intelligence Dashboard</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:text-white sm:inline-flex"
            >
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
