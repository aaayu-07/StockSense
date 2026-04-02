import { motion } from "framer-motion";

const metricConfig = [
  { key: "fifty_two_week_high", label: "52W High", prefix: "Rs " },
  { key: "fifty_two_week_low", label: "52W Low", prefix: "Rs " },
  { key: "average_close_price", label: "Avg Close", prefix: "Rs " },
  { key: "volatility_score", label: "Volatility", suffix: "%" },
];

export default function SummaryCards({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricConfig.map((metric, index) => (
        <motion.div
          key={metric.key}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-md transition dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-xl"
        >
          <p className="text-sm text-gray-500 dark:text-slate-400">{metric.label}</p>
          <h3 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">
            {metric.prefix || ""}
            {summary[metric.key]}
            {metric.suffix || ""}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300/75">
            {summary.symbol}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
