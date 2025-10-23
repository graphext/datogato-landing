import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="space-y-10" id="servicios">
      <header className="text-center">
        <h2 className="section-title text-3xl">Servicios que enamoran a la IA</h2>
        <p className="mt-3 text-[#5c2e1a]/80">
          Diseñamos paquetes modulares para que tus datos, historias y evidencias sean elegidas por los modelos.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.name}
            className="flex h-full flex-col justify-between rounded-[32px] border border-[#d9b38a] bg-[#fdf2e3] p-6 shadow-[8px_12px_0_rgba(92,46,26,0.18)]"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#5c2e1a]">
                {service.name}
              </h3>
              <p className="text-[#5c2e1a]/80">{service.description}</p>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-[#5c2e1a]/80">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#a04c2d]" />
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
