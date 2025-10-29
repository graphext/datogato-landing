import { faqs } from "@/lib/content";

export function FAQ() {
  return (
    <section id="faq" className="space-y-8">
      <header className="text-center">
        <h2 className="section-title text-3xl">{faqs.title}</h2>
        <p className="mt-3 text-foreground-80">
          Respondemos las dudas más repetidas cuando lanzamos estrategias de visibilidad en IA.
        </p>
      </header>
      <div className="space-y-4">
        {faqs.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[28px] border border-theme bg-card p-6 shadow-[6px_10px_0_var(--shadow-sm)]"
          >
            <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-foreground">
              {item.question}
              <span className="ml-4 text-sm text-accent transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-foreground-80">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
