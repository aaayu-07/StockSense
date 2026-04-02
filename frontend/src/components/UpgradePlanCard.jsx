const plans = [
  {
    name: "Starter",
    price: "Free",
    blurb: "Essential public stock views, responsive charts, and clean trend summaries.",
  },
  {
    name: "Pro",
    price: "Rs 799/mo",
    blurb: "Deeper comparative analysis, richer presentation layers, and premium polish.",
  },
  {
    name: "Elite",
    price: "Rs 1,499/mo",
    blurb: "Executive-ready visual intelligence, team collaboration, and white-label potential.",
  },
];

export default function UpgradePlanCard() {
  return (
    <section
      id="upgrade"
      className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-5 shadow-lg backdrop-contrast-125 dark:border-white/20 dark:from-cyan-500/10 dark:via-slate-900/70 dark:to-blue-500/10 dark:shadow-xl"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-700 dark:text-cyan-300">Upgrade Plan</p>
      <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">Scale up your investing workspace</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`rounded-[1.75rem] border p-5 ${
              index === 1
                ? "border-blue-200 bg-white shadow-lg dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:backdrop-blur-lg"
                : "border-gray-200 bg-white shadow-md dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg"
            }`}
          >
            <p className="text-sm text-gray-500 dark:text-slate-400">{plan.name}</p>
            <h3 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">{plan.price}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-slate-300">{plan.blurb}</p>
            <button
              type="button"
              className="mt-6 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 dark:border-white/20 dark:bg-slate-950/50 dark:hover:bg-slate-900"
            >
              {index === 1 ? "Current Best Value" : "Explore Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
