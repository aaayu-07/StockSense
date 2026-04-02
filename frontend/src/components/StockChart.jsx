import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function StockChart({ title, datasets, labels }) {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const themedDatasets = useMemo(
    () =>
      datasets.map((dataset) => ({
        ...dataset,
        borderWidth: dataset.borderWidth || 2.6,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return dataset.backgroundColor;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          const stops =
            dataset.gradientStops ||
            (isDark
              ? ["rgba(56,189,248,0.05)", "rgba(99,102,241,0.22)", "rgba(244,114,182,0.06)"]
              : ["rgba(29,78,216,0.06)", "rgba(37,99,235,0.18)", "rgba(67,56,202,0.04)"]);
          gradient.addColorStop(0, stops[0]);
          gradient.addColorStop(0.55, stops[1]);
          gradient.addColorStop(1, stops[2]);
          return gradient;
        },
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return dataset.borderColor;
          }
          const gradient = ctx.createLinearGradient(0, 0, chartArea.right, 0);
          const stops =
            dataset.borderStops ||
            (isDark
              ? ["#22d3ee", "#6366f1", "#f472b6"]
              : ["#1d4ed8", "#2563eb", "#4338ca"]);
          gradient.addColorStop(0, stops[0]);
          gradient.addColorStop(0.5, stops[1]);
          gradient.addColorStop(1, stops[2]);
          return gradient;
        },
      })),
    [datasets, isDark]
  );

  const chartData = {
    labels,
    datasets: themedDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDark ? "#cbd5e1" : "#374151",
        },
      },
      title: {
        display: true,
        text: title,
        color: isDark ? "#f8fafc" : "#0f172a",
        font: {
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.96)" : "rgba(255, 255, 255, 1)",
        borderColor: isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(209, 213, 219, 0.9)",
        borderWidth: 1,
        titleColor: isDark ? "#f8fafc" : "#0f172a",
        bodyColor: isDark ? "#cbd5e1" : "#374151",
        padding: 12,
        cornerRadius: 14,
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? "#94a3b8" : "#4b5563",
          maxTicksLimit: 8,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: isDark ? "#94a3b8" : "#4b5563",
        },
        grid: {
          color: isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(203, 213, 225, 0.7)",
        },
      },
    },
  };

  return (
    <div className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-md dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-xl">
      <div className="h-[360px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
