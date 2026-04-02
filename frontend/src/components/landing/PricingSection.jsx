import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "Rs 0",
    description: "Launch quickly with essential charts and public market intelligence.",
    features: ["Live chart view", "Company compare", "Market movers", "Summary metrics"],
  },
  {
    name: "Pro",
    price: "Rs 799",
    description: "For analysts who want faster workflows and deeper presentation polish.",
    features: ["Everything in Free", "Advanced layouts", "Export-ready insights", "Priority support"],
    featured: true,
  },
  {
    name: "Premium",
    price: "Rs 1,499",
    description: "For teams building a richer investing command center experience.",
    features: ["Everything in Pro", "Team-ready views", "White-label UI blocks", "Custom growth support"],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="space-y-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700/80 dark:text-cyan-300/80">
          Pricing
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
          Flexible plans for every stage of growth
        </h2>
        <p className="mt-4 text-base leading-8 text-gray-700 dark:text-slate-300">
          Clean, transparent pricing designed like a modern SaaS product. Choose the workflow that
          fits your team and scale up when you need more.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.12 }}
            whileHover={{ y: -8 }}
            className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(148,163,184,0.16)] backdrop-contrast-125 dark:shadow-[0_20px_70px_rgba(8,15,36,0.42)] ${
              plan.featured
                ? "border-blue-200 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:border-cyan-300/25 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
                : "border-gray-200 bg-white dark:border-white/20 dark:bg-white/10"
            }`}
          >
            {plan.featured ? (
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.12),_transparent_35%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.18),_transparent_36%)]" />
            ) : null}

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">{plan.name}</p>
                <h3 className="mt-4 text-4xl font-semibold text-gray-900 dark:text-white">{plan.price}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">per month</p>
              </div>
              {plan.featured ? (
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
                  Popular
                </span>
              ) : null}
            </div>
            <p className="relative mt-5 text-sm leading-7 text-gray-700 dark:text-slate-300">{plan.description}</p>
            <ul className="relative mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-700 dark:text-cyan-200">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`relative mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold transition ${
                plan.featured
                  ? "bg-blue-600 text-white hover:scale-[1.02] hover:bg-blue-700"
                  : "border border-gray-200 bg-white text-gray-900 hover:border-blue-300 dark:border-white/20 dark:bg-slate-950/40 dark:text-white"
              }`}
            >
              Choose {plan.name}
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
