import Link from "next/link";

export function BlogSection() {
  return (
    <section id="blog" className="space-y-6 rounded-[48px] border border-theme bg-card p-8 shadow-[12px_16px_0_var(--shadow-md)]">
      <div className="space-y-4 text-center">
        <h2 className="section-title text-3xl">Blog</h2>
        <p className="text-foreground-80">
          Explora nuestras guías y experimentos más recientes sobre visibilidad en asistentes IA y motores generativos.
        </p>
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--card-bg)] shadow-[6px_10px_0_var(--shadow-strong)] transition hover:translate-y-0.5 hover:bg-[var(--accent-dark)]"
        >
          Ver artículos
        </Link>
      </div>
    </section>
  );
}

