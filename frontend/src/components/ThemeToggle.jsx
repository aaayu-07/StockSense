import { motion } from "framer-motion";

import { useTheme } from "../context/ThemeContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1 1 11.21 3c-.02.27-.03.54-.03.82A9 9 0 0 0 20.18 12c.28 0 .55-.01.82-.03Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-3 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-md backdrop-contrast-125 transition hover:border-blue-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:text-white"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      <span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
    </motion.button>
  );
}
