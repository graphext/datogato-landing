import { contact } from "@/lib/content";

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="rounded-[48px] border border-[#d9b38a] bg-[#fdf2e3] p-8 shadow-[12px_16px_0_rgba(92,46,26,0.18)]"
    >
      <header className="max-w-2xl space-y-4">
        <h2 className="section-title text-3xl">{contact.title}</h2>
        <p className="text-[#5c2e1a]/75">{contact.subtitle}</p>
      </header>
      <form
        method="post"
        action="/api/contact"
        className="mt-8 grid gap-6 md:grid-cols-2"
      >
        {contact.form.fields.map((field) => {
          if (field.type === "textarea") {
            return (
              <label key={field.name} className="md:col-span-2">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#a04c2d]">
                  {field.label}
                </span>
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="mt-2 h-32 w-full resize-vertical rounded-3xl border border-[#d9b38a] bg-[#f8d7b3] px-4 py-3 text-sm text-[#5c2e1a] shadow-inner shadow-[#f4d9b7] focus:border-[#a04c2d] focus:outline-none focus:ring-2 focus:ring-[#a04c2d]/40"
                />
              </label>
            );
          }

          if (field.type === "select" && field.options) {
            return (
              <label key={field.name}>
                <span className="text-sm font-semibold uppercase tracking-widest text-[#a04c2d]">
                  {field.label}
                </span>
                <select
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className="mt-2 w-full rounded-3xl border border-[#d9b38a] bg-[#f8d7b3] px-4 py-3 text-sm text-[#5c2e1a] shadow-inner shadow-[#f4d9b7] focus:border-[#a04c2d] focus:outline-none focus:ring-2 focus:ring-[#a04c2d]/40"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          return (
            <label key={field.name}>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#a04c2d]">
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="mt-2 w-full rounded-3xl border border-[#d9b38a] bg-[#f8d7b3] px-4 py-3 text-sm text-[#5c2e1a] shadow-inner shadow-[#f4d9b7] focus:border-[#a04c2d] focus:outline-none focus:ring-2 focus:ring-[#a04c2d]/40"
              />
            </label>
          );
        })}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#a04c2d] px-6 py-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#fdf2e3] shadow-[6px_10px_0_rgba(92,46,26,0.35)] transition hover:translate-y-0.5 hover:bg-[#8c3f1f]"
          >
            {contact.form.submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
