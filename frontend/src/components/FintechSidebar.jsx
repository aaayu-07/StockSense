import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import BrandMark from "./BrandMark";

const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "companies", label: "Companies" },
  { id: "compare", label: "Compare" },
  { id: "upgrade", label: "Upgrade" },
];

export default function FintechSidebar({ isOpen = true, onNavigate, currentSection = "dashboard" }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className={`rounded-[2rem] border border-gray-200 bg-white p-5 shadow-lg backdrop-contrast-125 dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-[0_24px_90px_rgba(2,6,23,0.42)] ${isOpen ? "block" : "hidden lg:block"}`}
    >
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-5 dark:border-cyan-400/20 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between gap-3">
          <BrandMark to="/" compact className="min-w-0" />
          <Link
            to="/"
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-800 transition hover:border-blue-300 hover:text-gray-900 dark:border-white/20 dark:bg-white/5 dark:text-slate-200 dark:hover:text-white"
          >
            Home
          </Link>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Market Dashboard</h2>
        <p className="mt-1 text-sm text-gray-700 dark:text-slate-400">
          Track price action, compare performance, and scan movers in one place.
        </p>
        <div className="mt-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-200">
          Live Analytics
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onNavigate}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
              currentSection === section.id
                ? "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 shadow-lg dark:border-cyan-400/30 dark:from-cyan-400/15 dark:to-indigo-400/10 dark:text-white"
                : "border-transparent text-gray-700 hover:border-blue-200 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            }`}
          >
            <span>{section.label}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-slate-500">Go</span>
          </a>
        ))}
      </nav>
    </motion.aside>
  );
}
