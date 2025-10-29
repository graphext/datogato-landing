import { platforms } from "@/lib/content";

export function Platforms() {
  return (
    <section className="rounded-[48px] border border-theme bg-light p-10 shadow-[12px_16px_0_var(--shadow-md)]">
      <header className="max-w-2xl space-y-4">
        <p className="section-title text-sm tracking-[0.4em] text-accent">
          Inteligencia multiplataforma
        </p>
        <h2 className="text-3xl font-semibold text-foreground">
          {platforms.title}
        </h2>
        <p className="text-foreground-75">{platforms.subtitle}</p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {platforms.items.map((item) => (
          <article
            key={item.name}
            className="rounded-[28px] border border-theme bg-card p-6 transition hover:-translate-y-1 hover:shadow-[8px_12px_0_var(--shadow-lg)]"
          >
            <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
            <p className="mt-4 text-sm text-foreground-80">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
