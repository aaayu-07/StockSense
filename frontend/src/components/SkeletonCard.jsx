export default function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-[1.75rem] bg-slate-200/70 dark:bg-white/5 ${className}`}
    />
  );
}
