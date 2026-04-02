import Footer from "./landing/Footer";
import LandingNavbar from "./landing/LandingNavbar";

export default function ContentPageShell({ title, intro, children, contentWidth = "max-w-4xl" }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_#ffffff_0%,_#f3f4f6_40%,_#f8fafc_100%)] dark:bg-[linear-gradient(180deg,_#060816_0%,_#0A1025_38%,_#050816_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/18" />
      <div className="pointer-events-none absolute right-[-4rem] top-48 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/18" />

      <div className="relative">
        <LandingNavbar />

        <main className={`mx-auto ${contentWidth} px-6 pb-20 pt-24 sm:px-8 lg:px-10 lg:pt-28`}>
          <div className="rounded-[2rem] border border-gray-200 bg-white/95 p-8 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-900/85 dark:shadow-[0_28px_100px_rgba(2,6,23,0.52)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700/80 dark:text-cyan-300/80">
              StockSense
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl">
              {title}
            </h1>
            {intro ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-700 dark:text-slate-300">
                {intro}
              </p>
            ) : null}

            <div className="mt-10 space-y-6 text-base leading-8 text-gray-700 dark:text-slate-300">
              {children}
            </div>
          </div>
        </main>

        <div className="mx-auto max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
