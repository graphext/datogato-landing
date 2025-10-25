import Link from "next/link";

export function BlogSection() {
  return (
    <section id="blog" className="space-y-6 rounded-[48px] border border-[#d9b38a] bg-[#fdf2e3] p-8 shadow-[12px_16px_0_rgba(92,46,26,0.18)]">
      <div className="space-y-4 text-center">
        <h2 className="section-title text-3xl">Blog</h2>
        <p className="text-[#5c2e1a]/80">
          Explora nuestras guías y experimentos más recientes sobre visibilidad en asistentes IA y motores generativos.
        </p>
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-full bg-[#a04c2d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#fdf2e3] shadow-[6px_10px_0_rgba(92,46,26,0.35)] transition hover:translate-y-0.5 hover:bg-[#8c3f1f]"
        >
          Ver artículos
        </Link>
      </div>
    </section>
  );
}

