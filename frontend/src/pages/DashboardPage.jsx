import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import ComparePanel from "../components/ComparePanel";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import FintechSidebar from "../components/FintechSidebar";
import MarketMovers from "../components/MarketMovers";
import SkeletonCard from "../components/SkeletonCard";
import StockChart from "../components/StockChart";
import SummaryCards from "../components/SummaryCards";
import UpgradePlanCard from "../components/UpgradePlanCard";
import {
  fetchCompanies,
  fetchComparison,
  fetchMarketMovers,
  fetchStockData,
  fetchSummary,
} from "../services/api";

const RANGE_OPTIONS = [30, 90];

function getApiErrorMessage(requestError, fallbackMessage) {
  console.error("Dashboard request failed:", requestError);
  return requestError.response?.data?.detail || requestError.message || fallbackMessage;
}

export default function DashboardPage() {
  const [companies, setCompanies] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("INFY");
  const [rangeDays, setRangeDays] = useState(30);
  const [stockData, setStockData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [movers, setMovers] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [compareLoading, setCompareLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [compareSelection, setCompareSelection] = useState({
    symbol1: "INFY",
    symbol2: "TCS",
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const [companyList, moversResponse, stockResponse, summaryResponse, compareResponse] =
          await Promise.all([
            fetchCompanies(),
            fetchMarketMovers(),
            fetchStockData(selectedSymbol, rangeDays),
            fetchSummary(selectedSymbol),
            fetchComparison(compareSelection.symbol1, compareSelection.symbol2, rangeDays),
          ]);

        setCompanies(companyList);
        setMovers(moversResponse);
        setStockData(stockResponse);
        setSummary(summaryResponse);
        setComparison(compareResponse);
      } catch (requestError) {
        setError(
          getApiErrorMessage(
            requestError,
            "We could not load the dashboard. Please make sure the backend server is running."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    if (!companies.length) {
      return;
    }

    const loadSelectedStock = async () => {
      try {
        setLoading(true);
        setError("");
        const [stockResponse, summaryResponse] = await Promise.all([
          fetchStockData(selectedSymbol, rangeDays),
          fetchSummary(selectedSymbol),
        ]);
        setStockData(stockResponse);
        setSummary(summaryResponse);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "We could not refresh the selected stock."));
      } finally {
        setLoading(false);
      }
    };

    loadSelectedStock();
  }, [selectedSymbol, rangeDays, companies.length]);

  const handleCompare = async () => {
    try {
      setCompareLoading(true);
      setError("");
      const compareResponse = await fetchComparison(
        compareSelection.symbol1,
        compareSelection.symbol2,
        rangeDays
      );
      setComparison(compareResponse);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Comparison failed."));
    } finally {
      setCompareLoading(false);
    }
  };

  const primaryChart = useMemo(() => {
    if (!stockData) {
      return { labels: [], datasets: [] };
    }

    return {
      labels: stockData.data.map((entry) => entry.date),
      datasets: [
        {
          label: `${stockData.symbol} Close`,
          data: stockData.data.map((entry) => entry.close),
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          gradientStops: [
            "rgba(56,189,248,0.04)",
            "rgba(37,99,235,0.22)",
            "rgba(99,102,241,0.06)",
          ],
          borderStops: ["#22d3ee", "#3b82f6", "#6366f1"],
        },
        {
          label: "7-Day Moving Average",
          data: stockData.data.map((entry) => entry.moving_average_7),
          fill: false,
          tension: 0.28,
          pointRadius: 0,
          gradientStops: [
            "rgba(129,140,248,0.03)",
            "rgba(124,58,237,0.14)",
            "rgba(244,114,182,0.03)",
          ],
          borderStops: ["#6366f1", "#8b5cf6", "#f472b6"],
        },
      ],
    };
  }, [stockData]);

  const comparisonChart = useMemo(() => {
    if (!comparison) {
      return { labels: [], datasets: [] };
    }

    return {
      labels: comparison.symbol1.data.map((entry) => entry.date),
      datasets: [
        {
          label: `${comparison.symbol1.symbol} (${comparison.symbol1.performance_percent}%)`,
          data: comparison.symbol1.data.map((entry) => entry.close),
          fill: false,
          tension: 0.28,
          pointRadius: 0,
          borderStops: ["#22d3ee", "#3b82f6", "#6366f1"],
        },
        {
          label: `${comparison.symbol2.symbol} (${comparison.symbol2.performance_percent}%)`,
          data: comparison.symbol2.data.map((entry) => entry.close),
          fill: false,
          tension: 0.28,
          pointRadius: 0,
          borderStops: ["#818cf8", "#a855f7", "#f472b6"],
        },
      ],
    };
  }, [comparison]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_#ffffff_0%,_#f3f4f6_55%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.14),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#0b1120_60%,_#020617_100%)]" />
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <DashboardNavbar onMenuToggle={() => setSidebarOpen((current) => !current)} />

        <div className="mt-5 grid gap-5 xl:grid-cols-[280px_1fr]">
          {sidebarOpen ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation overlay"
            />
          ) : null}

          <div className={`relative z-40 lg:z-auto ${sidebarOpen ? "fixed left-4 top-24 w-[min(85vw,280px)] lg:static lg:w-auto" : ""}`}>
            <FintechSidebar
              isOpen={sidebarOpen}
              onNavigate={() => setSidebarOpen(false)}
              currentSection={comparison ? "compare" : "dashboard"}
            />
          </div>

          <main className="space-y-5">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              id="dashboard"
              className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-md dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-xl"
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-700 dark:text-cyan-300">
                    StockSense Dashboard
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
                    Premium market intelligence with adaptive themes
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700 dark:text-slate-300 sm:text-base">
                    Explore market data, compare tracked stocks, review 52-week levels, and spot
                    daily movers from a polished fintech workspace that matches the landing page.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div id="companies" className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-white/20 dark:bg-slate-950/40">
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-500 dark:text-slate-500">Companies</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {companies.map((company) => (
                        <button
                          key={company.symbol}
                          type="button"
                          onClick={() => setSelectedSymbol(company.symbol)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selectedSymbol === company.symbol
                              ? "bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 shadow-glow-soft"
                              : "bg-gray-50 text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                          }`}
                        >
                          {company.symbol}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-white/20 dark:bg-slate-950/40">
                    <label
                      htmlFor="range"
                      className="text-xs uppercase tracking-[0.28em] text-gray-500 dark:text-slate-500"
                    >
                      Time Range
                    </label>
                    <select
                      id="range"
                      value={rangeDays}
                      onChange={(event) => setRangeDays(Number(event.target.value))}
                      className="mt-3 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 dark:border-white/20 dark:bg-slate-950/70 dark:text-white"
                    >
                      {RANGE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          Last {option} Days
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.section>

            {error ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-100">
                {error}
              </div>
            ) : null}

            {loading ? (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <SkeletonCard className="h-32" />
                  <SkeletonCard className="h-32" />
                  <SkeletonCard className="h-32" />
                  <SkeletonCard className="h-32" />
                </div>
                <SkeletonCard className="h-[420px]" />
                <SkeletonCard className="h-[240px]" />
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                >
                  <SummaryCards summary={summary} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                >
                  <StockChart
                    title={`${stockData?.company_name || ""} Price Trend`}
                    labels={primaryChart.labels}
                    datasets={primaryChart.datasets}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16 }}
                >
                  <ComparePanel
                    companies={companies}
                    compareSelection={compareSelection}
                    onChange={(field, value) =>
                      setCompareSelection((current) => ({ ...current, [field]: value }))
                    }
                    onSubmit={handleCompare}
                    loading={compareLoading}
                  />
                </motion.div>

                {comparison ? (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <StockChart
                      title="Comparative Performance"
                      labels={comparisonChart.labels}
                      datasets={comparisonChart.datasets}
                    />
                  </motion.div>
                ) : null}

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                >
                  <MarketMovers movers={movers} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                >
                  <UpgradePlanCard />
                </motion.div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
