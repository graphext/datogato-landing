"use client";

import { contact } from "@/lib/content";
import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch(form.action || "/api/contact", {
        method: form.method || "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = typeof data?.error === "string"
          ? data.error
          : "No hemos podido enviar tu solicitud. Inténtalo de nuevo.";
        throw new Error(errorMessage);
      }

      setStatus("success");
      setMessage("¡Gracias! Hemos recibido tu solicitud y te contactaremos muy pronto.");
      form.reset();
    } catch (error) {
      console.error("Contact form submission error", error);
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No hemos podido enviar tu solicitud. Inténtalo más tarde.",
      );
    }
  };

  return (
    <section
      id="contacto"
      className="rounded-[48px] border border-theme bg-card p-8 shadow-[12px_16px_0_var(--shadow-md)]"
    >
      <header className="max-w-2xl space-y-4">
        <h2 className="section-title text-3xl">{contact.title}</h2>
        <p className="text-foreground-75">{contact.subtitle}</p>
      </header>
      <form
        method="post"
        action="/api/contact"
        className="mt-8 grid gap-6 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        {contact.form.fields.map((field) => {
          if (field.type === "textarea") {
            return (
              <label key={field.name} className="md:col-span-2">
                <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                  {field.label}
                </span>
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="mt-2 h-32 w-full resize-vertical rounded-3xl border border-theme bg-input px-4 py-3 text-sm text-foreground shadow-inner shadow-inner-accent focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
                />
              </label>
            );
          }

          return (
            <label key={field.name}>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="mt-2 w-full rounded-3xl border border-theme bg-input px-4 py-3 text-sm text-foreground shadow-inner shadow-inner-accent focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
              />
            </label>
          );
        })}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--card-bg)] shadow-[6px_10px_0_var(--shadow-strong)] transition hover:translate-y-0.5 hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Enviando..." : contact.form.submitLabel}
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm font-semibold uppercase tracking-widest ${status === "success" ? "text-[var(--color-success)]" : "text-accent"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </section>
  );
}
