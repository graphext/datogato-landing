import { platforms } from "@/lib/content";

export function Platforms() {
  return (
    <section className="rounded-[48px] border border-[#d9b38a] bg-[#f5e7d4] p-10 shadow-[12px_16px_0_rgba(92,46,26,0.18)]">
      <header className="max-w-2xl space-y-4">
        <p className="section-title text-sm tracking-[0.4em] text-[#a04c2d]">
          Inteligencia multiplataforma
        </p>
        <h2 className="text-3xl font-semibold text-[#5c2e1a]">
          {platforms.title}
        </h2>
        <p className="text-[#5c2e1a]/75">{platforms.subtitle}</p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {platforms.items.map((item) => (
          <article
            key={item.name}
            className="rounded-[28px] border border-[#d9b38a] bg-[#fdf2e3] p-6 transition hover:-translate-y-1 hover:shadow-[8px_12px_0_rgba(92,46,26,0.2)]"
          >
            <h3 className="text-xl font-semibold text-[#5c2e1a]">{item.name}</h3>
            <p className="mt-4 text-sm text-[#5c2e1a]/80">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
