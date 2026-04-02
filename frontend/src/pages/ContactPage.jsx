import ContentPageShell from "../components/ContentPageShell";

const contactInfo = [
  {
    label: "Email",
    value: "hello@stocksense.app",
    href: "mailto:hello@stocksense.app",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Bengaluru, India",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.34 2.74-1.06 2.74-1.06.55 1.41.2 2.46.1 2.72.64.73 1.03 1.65 1.03 2.78 0 3.98-2.35 4.85-4.59 5.11.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.03c0 1.12.9 2.03 2.01 2.03h.02a2.03 2.03 0 0 0 .02-4.06ZM20.8 12.77c0-3.09-1.65-4.53-3.86-4.53-1.78 0-2.58.99-3.02 1.68V8.5h-3.38c.04.95 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.35 0 1.9 1.04 1.9 2.57V20H21s.05-5.88.05-7.23Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <ContentPageShell
      title="Get in touch"
      intro="Have questions or feedback? We'd love to hear from you."
      contentWidth="max-w-6xl"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <section className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-300">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
              Let's build a sharper stock intelligence experience
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-gray-700 dark:text-slate-300">
              Reach out for product feedback, collaboration ideas, partnership conversations, or
              questions about the StockSense platform.
            </p>
          </div>

          <div className="space-y-4">
            {contactInfo.map((item) => {
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a key={item.label} href={item.href} className="block transition hover:-translate-y-0.5">
                    {content}
                  </a>
                );
              }

              return <div key={item.label}>{content}</div>;
            })}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">
              Social
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:text-cyan-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-slate-900/75 dark:backdrop-blur-md dark:shadow-[0_28px_90px_rgba(2,6,23,0.45)]">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700 dark:text-cyan-300">
              Message Us
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
              Tell us what you need
            </h3>
          </div>

          <form className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Name</span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Email</span>
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Message</span>
              <textarea
                rows="7"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                placeholder="Tell us about your question, idea, or feedback."
              />
            </label>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </ContentPageShell>
  );
}
