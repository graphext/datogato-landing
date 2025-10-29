import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="rounded-[48px] border border-theme bg-card p-8 shadow-[12px_16px_0_var(--shadow-md)]">
      <header className="space-y-3 text-center">
        <h2 className="section-title text-3xl">{testimonials.title}</h2>
        <p className="text-foreground-75">
          Historias que muestran cómo los asistentes de IA recomiendan a nuestros clientes.
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item) => (
          <figure
            key={item.author}
            className="flex h-full flex-col justify-between rounded-[28px] border border-theme bg-light p-6 shadow-[6px_10px_0_var(--shadow-sm)]"
          >
            <blockquote className="text-sm text-foreground-80">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-6 text-[0.85rem] font-semibold text-foreground">
              {item.author}
              <span className="block text-xs font-medium uppercase tracking-wide text-accent">
                {item.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
