import { personas } from "@/lib/content";

export function Personas() {
  return (
    <section className="rounded-[48px] border border-[#d9b38a] bg-[#fdf2e3] p-8 shadow-[12px_16px_0_rgba(92,46,26,0.18)]">
      <header className="space-y-4 text-center">
        <h2 className="section-title text-3xl">{personas.title}</h2>
        <p className="text-[#5c2e1a]/75">
          Entendemos las prioridades de marketing, crecimiento y reputación de tus equipos para acelerar decisiones IA.
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {personas.personas.map((persona) => (
          <article
            key={persona.name}
            className="rounded-[28px] border border-[#d9b38a] bg-[#f5e7d4] p-6 text-left shadow-[6px_10px_0_rgba(92,46,26,0.16)]"
          >
            <h3 className="text-lg font-semibold text-[#5c2e1a]">{persona.name}</h3>
            <dl className="mt-4 space-y-3 text-sm text-[#5c2e1a]/80">
              <div>
                <dt className="font-semibold uppercase tracking-widest text-[#a04c2d]">
                  Dolor
                </dt>
                <dd>{persona.pain}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-widest text-[#a04c2d]">
                  Ganancia
                </dt>
                <dd>{persona.gain}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
