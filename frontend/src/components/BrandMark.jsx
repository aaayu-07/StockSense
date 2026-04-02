import { Link } from "react-router-dom";

function StockSenseIcon({ className = "h-11 w-11", tileClassName = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-indigo-500 shadow-[0_14px_35px_rgba(56,189,248,0.28)] ${className} ${tileClassName}`}
    >
      <svg viewBox="0 0 64 64" className="h-[70%] w-[70%]" fill="none" aria-hidden="true">
        <rect x="7" y="7" width="50" height="50" rx="12" stroke="white" strokeWidth="4.5" opacity="0.95" />
        <path
          d="M18 40 29 28l8 8 15-15"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 21h8v8"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="20" y="40" width="7" height="8" rx="2.5" fill="white" opacity="0.96" />
        <rect x="30" y="34" width="7" height="14" rx="2.5" fill="white" opacity="0.96" />
        <rect x="40" y="27" width="7" height="21" rx="2.5" fill="white" opacity="0.96" />
      </svg>
    </div>
  );
}

export default function BrandMark({
  to = "/",
  showTagline = false,
  compact = false,
  className = "",
  iconClassName = "",
  titleClassName = "",
}) {
  const content = (
    <>
      <StockSenseIcon className={compact ? "h-10 w-10" : "h-12 w-12"} tileClassName={iconClassName} />
      <div className="min-w-0">
        <div
          className={`bg-gradient-to-r from-slate-950 via-cyan-700 to-indigo-600 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-white dark:via-cyan-200 dark:to-indigo-300 ${titleClassName}`}
        >
          StockSense
        </div>
        {showTagline ? (
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">
            Stock Intelligence
          </p>
        ) : null}
      </div>
    </>
  );

  if (!to) {
    return <div className={`flex items-center gap-3 ${className}`}>{content}</div>;
  }

  return (
    <Link to={to} className={`flex items-center gap-3 ${className}`}>
      {content}
    </Link>
  );
}
