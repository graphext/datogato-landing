import { cases } from "@/lib/content";

export function CaseStudies() {
  return (
    <section id="casos" className="space-y-10">
      <header className="text-center">
        <h2 className="section-title text-3xl">{cases.title}</h2>
        <p className="mt-3 text-[#5c2e1a]/80">
          Inspiración real de marcas que lideran las respuestas generadas por IA.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {cases.items.map((item) => (
          <article
            key={item.headline}
            className="rounded-[28px] border border-[#d9b38a] bg-[#fdf2e3] p-6 text-left shadow-[10px_14px_0_rgba(92,46,26,0.18)]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#a04c2d]">
              {item.sector}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[#5c2e1a]">
              {item.headline}
            </h3>
            <p className="mt-3 text-sm text-[#5c2e1a]/75">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
