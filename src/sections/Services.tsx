import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="space-y-10" id="servicios">
      <header className="text-center">
        <h2 className="section-title text-3xl">Servicios que enamoran a la IA</h2>
        <p className="mt-3 text-foreground-80">
          Diseñamos paquetes modulares para que tus datos, historias y evidencias sean elegidas por los modelos.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.name}
            className="flex h-full flex-col justify-between rounded-[32px] border border-theme bg-card p-6 shadow-[8px_12px_0_var(--shadow-md)]"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                {service.name}
              </h3>
              <p className="text-foreground-80">{service.description}</p>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-foreground-80">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
