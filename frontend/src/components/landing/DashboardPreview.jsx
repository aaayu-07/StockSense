import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

const metrics = [
  { label: "INFY", value: "+3.2%" },
  { label: "Volatility", value: "18.4%" },
  { label: "Momentum", value: "Bullish" },
];

const bars = [34, 42, 58, 49, 63, 71, 78, 73, 86, 92, 88, 100];

export default function DashboardPreview() {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700/80 dark:text-cyan-300/80">
          Dashboard Preview
        </p>
        <h2 className="mt-5 text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
          A command center for modern stock analysis
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-gray-700 dark:text-gray-400">
          Monitor market movers, compare leaders, inspect trend curves, and review summary
          metrics in one structured workspace designed for fast decision making.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/dashboard"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <a
            href="#features"
            className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-blue-300 hover:bg-gray-50 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            See what powers it
          </a>
        </div>
      </div>

      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className={`rounded-[2rem] border p-6 transition-all duration-300 ${
          isDark
            ? "border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-xl shadow-blue-950/30 hover:shadow-2xl"
            : "border-gray-200 bg-white shadow-lg hover:shadow-2xl"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                isDark ? "text-slate-300" : "text-gray-500"
              }`}
            >
              Signal Stack
            </p>
            <h3
              className={`mt-3 text-3xl font-semibold ${
                isDark ? "text-white drop-shadow-[0_1px_12px_rgba(15,23,42,0.45)]" : "text-gray-900"
              }`}
            >
              Market in motion
            </h3>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${
              isDark
                ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-200"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            Live
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl border p-4 ${
                isDark
                  ? "border-white/10 bg-slate-800/95 shadow-lg shadow-slate-950/40"
                  : "border-gray-200 bg-gray-100 shadow-sm"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.28em] ${
                  isDark ? "text-slate-300" : "text-gray-500"
                }`}
              >
                {metric.label}
              </p>
              <p
                className={`mt-3 text-2xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className={`mt-6 rounded-[1.5rem] border p-5 ${
            isDark
              ? "border-white/10 bg-slate-800 shadow-inner shadow-slate-950/30 ring-1 ring-blue-400/20"
              : "border-gray-200 bg-gray-50 shadow-sm ring-1 ring-blue-500/10"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.28em] ${
                  isDark ? "text-slate-300" : "text-gray-500"
                }`}
              >
                Trend View
              </p>
              <p className={`mt-2 text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                30 day momentum
              </p>
            </div>
            <div className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.85)]" : "bg-blue-600"}`} />
          </div>

          <div className={`flex h-44 items-end gap-2 rounded-[1rem] p-4 ${isDark ? "bg-slate-900" : "bg-white"}`}>
            {bars.map((height, index) => (
              <motion.div
                key={`${height}-${index}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.03 }}
                className={`flex-1 rounded-t-xl ${
                  isDark
                    ? "bg-gradient-to-t from-blue-500 via-cyan-400 to-indigo-200"
                    : "bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
