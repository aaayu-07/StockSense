import { motion } from "framer-motion";

function MoversList({ title, items, positive, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -6 }}
      className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-md dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-700 dark:text-cyan-300">
          {positive ? "Momentum" : "Pressure"}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={`${title}-${item.symbol}`}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-950/40"
          >
            <div>
              <strong className="text-gray-900 dark:text-white">{item.symbol}</strong>
              <span className="mt-1 block text-sm text-gray-600 dark:text-slate-400">{item.company_name}</span>
            </div>
            <div className={positive ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}>
              {item.change_percent}%
            </div>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function MarketMovers({ movers }) {
  if (!movers) {
    return null;
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <MoversList title="Top Gainers" items={movers.top_gainers} positive delay={0.05} />
      <MoversList title="Top Losers" items={movers.top_losers} positive={false} delay={0.1} />
    </section>
  );
}
