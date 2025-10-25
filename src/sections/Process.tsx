import { process } from "@/lib/content";

export function Process() {
  return (
    <div className="space-y-8" aria-labelledby="metodologia-title">
      <header className="text-center">
        <h2 id="metodologia-title" className="section-title text-3xl">
          Metodología Gatodato
        </h2>
        <p className="mt-3 text-[#5c2e1a]/80">
          Nuestra hoja de ruta conecta insights técnicos, creatividad humana y datos estructurados para IA.
        </p>
      </header>
      <ol className="relative mt-6 space-y-10 pl-8 sm:pl-12 before:absolute before:inset-y-0 before:left-[4.5rem] before:w-[3px] before:rounded-full before:bg-[#a04c2d]">
        <span
          className="pointer-events-none absolute left-[4.5rem] top-0 h-[1.5rem] w-[3px] rounded-b-full bg-[#fdf2e3]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute left-[4.5rem] bottom-0 h-[1.5rem] w-[3px] rounded-t-full bg-[#fdf2e3]"
          aria-hidden="true"
        />
        {process.steps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[auto_1fr] items-start gap-6">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#a04c2d] text-lg font-bold text-[#fdf2e3] shadow-[4px_8px_0_rgba(92,46,26,0.2)]">
              {index + 1}
            </div>
            <article className="rounded-[32px] border border-[#d9b38a] bg-[#fdf2e3] p-6 shadow-[6px_10px_0_rgba(92,46,26,0.16)]">
              <h3 className="text-xl font-semibold text-[#5c2e1a]">{step.title}</h3>
              <p className="mt-3 text-[#5c2e1a]/80">{step.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
