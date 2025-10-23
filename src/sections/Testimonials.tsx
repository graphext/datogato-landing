import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="rounded-[48px] border border-[#d9b38a] bg-[#fdf2e3] p-8 shadow-[12px_16px_0_rgba(92,46,26,0.18)]">
      <header className="space-y-3 text-center">
        <h2 className="section-title text-3xl">{testimonials.title}</h2>
        <p className="text-[#5c2e1a]/75">
          Historias que muestran cómo los asistentes de IA recomiendan a nuestros clientes.
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <figure
            key={item.author}
            className="flex h-full flex-col justify-between rounded-[28px] border border-[#d9b38a] bg-[#f5e7d4] p-6 shadow-[6px_10px_0_rgba(92,46,26,0.16)]"
          >
            <blockquote className="text-sm text-[#5c2e1a]/80">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-6 text-[0.85rem] font-semibold text-[#5c2e1a]">
              {item.author}
              <span className="block text-xs font-medium uppercase tracking-wide text-[#a04c2d]">
                {item.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
