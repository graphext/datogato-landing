import { process } from "@/lib/content";

export function Process() {
  return (
    <section id={process.id} className="space-y-8">
      <header className="text-center">
        <h2 className="section-title text-3xl">Metodología Gatodato</h2>
        <p className="mt-3 text-[#5c2e1a]/80">
          Nuestra hoja de ruta conecta insights técnicos, creatividad humana y datos estructurados para IA.
        </p>
      </header>
      <ol className="relative border-l-4 border-[#a04c2d] pl-6">
        {process.steps.map((step, index) => (
          <li key={step.title} className="mb-10 ml-4">
            <div className="absolute -left-[38px] flex h-12 w-12 items-center justify-center rounded-full bg-[#a04c2d] text-lg font-bold text-[#fdf2e3] shadow-[4px_8px_0_rgba(92,46,26,0.2)]">
              {index + 1}
            </div>
            <article className="rounded-[32px] border border-[#d9b38a] bg-[#fdf2e3] p-6 shadow-[6px_10px_0_rgba(92,46,26,0.16)]">
              <h3 className="text-xl font-semibold text-[#5c2e1a]">{step.title}</h3>
              <p className="mt-3 text-[#5c2e1a]/80">{step.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
