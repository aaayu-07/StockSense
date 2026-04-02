import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg backdrop-contrast-125 transition dark:border-white/20 dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-[0_20px_70px_rgba(8,15,36,0.42)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-700 shadow-glow transition group-hover:border-cyan-300/40 group-hover:bg-cyan-300/15 dark:text-cyan-200">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-700 dark:text-slate-300">{description}</p>
    </motion.article>
  );
}
