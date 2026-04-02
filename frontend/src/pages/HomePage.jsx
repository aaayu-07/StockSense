import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import AnimatedType from "../components/landing/AnimatedType";
import DashboardPreview from "../components/landing/DashboardPreview";
import FeatureCard from "../components/landing/FeatureCard";
import Footer from "../components/landing/Footer";
import LandingNavbar from "../components/landing/LandingNavbar";
import PricingSection from "../components/landing/PricingSection";

const features = [
  {
    title: "Real-time stock data",
    description: "Track market movement with crisp, readable charts and instantly accessible company views.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.8">
        <path d="M4 18 10 12l4 4 6-8" />
        <path d="M20 8v6h-6" />
      </svg>
    ),
  },
  {
    title: "Compare leaders",
    description: "Benchmark top names side by side to understand relative strength and price direction.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.8">
        <rect x="4" y="5" width="6" height="14" rx="2" />
        <rect x="14" y="9" width="6" height="10" rx="2" />
      </svg>
    ),
  },
  {
    title: "Volatility insights",
    description: "Surface risk quickly with rolling analytics and clear summary cards that stay readable.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.8">
        <path d="M4 17c2.5-5.33 4.5-8 6-8s3.5 2.67 6 8c1.25-2 2.58-3 4-3" />
      </svg>
    ),
  },
  {
    title: "Market movers",
    description: "Spot gainers and losers faster with momentum-focused ranking and trend-first layouts.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="1.8">
        <path d="M12 4v16" />
        <path d="m7 9 5-5 5 5" />
        <path d="m17 15-5 5-5-5" />
      </svg>
    ),
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65 },
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_#ffffff_0%,_#f3f4f6_40%,_#f8fafc_100%)] dark:bg-[linear-gradient(180deg,_#060816_0%,_#0A1025_38%,_#050816_100%)]" />
      <motion.div
        animate={{ x: [0, 16, -12, 0], y: [0, -10, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/18"
      />
      <motion.div
        animate={{ x: [0, -20, 10, 0], y: [0, 12, -6, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-4rem] top-48 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/18"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/5 blur-3xl dark:bg-fuchsia-500/10"
      />

      <div className="relative">
        <LandingNavbar />

        <main>
          <section className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-16 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
                Live market intelligence for smarter decisions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
              >
                <AnimatedType />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="mt-8 max-w-2xl text-lg leading-8 text-gray-700 dark:text-slate-300 sm:text-xl"
              >
                A data-driven platform for stock analysis, insights, and smarter decisions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to="/dashboard"
                  className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-blue-700"
                >
                  View Dashboard
                </Link>
                <a
                  href="#features"
                  className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 backdrop-blur-xl transition hover:border-blue-300 hover:bg-gray-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Explore Features
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="relative"
            >
              <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-r from-cyan-500/12 via-blue-500/10 to-fuchsia-500/12 blur-3xl dark:from-cyan-500/16 dark:via-blue-500/14 dark:to-fuchsia-500/16" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 dark:shadow-[0_34px_120px_rgba(2,6,23,0.72)]">
                <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/12" />
                <div className="relative rounded-[2rem] border border-gray-200 bg-white p-6 shadow-inner dark:border-white/10 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gray-500 dark:text-slate-300">
                        Signal Stack
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">
                        Market in motion
                      </h2>
                    </div>
                    <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 dark:border-cyan-300/30 dark:bg-cyan-400/15 dark:text-cyan-200">
                      Live
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        ["INFY", "+3.2%"],
                        ["Volatility", "18.4%"],
                        ["Momentum", "Bullish"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-800 dark:shadow-[0_12px_30px_rgba(2,6,23,0.35)]"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500 dark:text-slate-300">
                            {label}
                          </p>
                          <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50 p-5 ring-1 ring-blue-500/10 dark:border-white/10 dark:bg-slate-800 dark:ring-blue-400/20">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500 dark:text-slate-300">
                            Trend View
                          </p>
                          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                            30 day momentum
                          </p>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-cyan-300 dark:shadow-[0_0_22px_rgba(103,232,249,0.85)]" />
                      </div>

                      <div className="flex h-48 items-end gap-2 rounded-[1.25rem] border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
                        {[35, 42, 56, 49, 60, 68, 74, 70, 81, 88, 84, 94].map((height, index) => (
                          <motion.div
                            key={height}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.04 }}
                            className="flex-1 rounded-t-2xl bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-300 dark:from-blue-500 dark:via-cyan-400 dark:to-indigo-100"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700/80 dark:text-cyan-300/80">
                Features
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
                A polished interface for stock intelligence
              </h2>
              <p className="mt-4 text-base leading-8 text-gray-700 dark:text-slate-300">
                Built for clarity, speed, and trust with modern motion, glassmorphism panels, and
                market-focused information architecture.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} delay={index * 0.08} />
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <DashboardPreview />
          </section>

          <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <PricingSection />
          </section>
        </main>

        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
