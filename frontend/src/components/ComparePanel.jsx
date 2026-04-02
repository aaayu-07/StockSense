import { motion } from "framer-motion";

export default function ComparePanel({
  companies,
  compareSelection,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      id="compare"
      className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-md dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-xl"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-700 dark:text-cyan-300">Comparison</p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">Benchmark Two Stocks</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            Compare price action and momentum across your chosen companies.
          </p>
        </div>

        <div className="grid flex-1 gap-3 md:grid-cols-3">
          <select
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 dark:border-white/20 dark:bg-slate-950/60 dark:text-white"
            value={compareSelection.symbol1}
            onChange={(event) => onChange("symbol1", event.target.value)}
          >
            {companies.map((company) => (
              <option key={`left-${company.symbol}`} value={company.symbol}>
                {company.symbol}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 dark:border-white/20 dark:bg-slate-950/60 dark:text-white"
            value={compareSelection.symbol2}
            onChange={(event) => onChange("symbol2", event.target.value)}
          >
            {companies.map((company) => (
              <option key={`right-${company.symbol}`} value={company.symbol}>
                {company.symbol}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
