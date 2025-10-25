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
        onSubmit={handleSubmit}
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
            className="inline-flex w-full items-center justify-center rounded-full bg-[#a04c2d] px-6 py-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#fdf2e3] shadow-[6px_10px_0_rgba(92,46,26,0.35)] transition hover:translate-y-0.5 hover:bg-[#8c3f1f] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Enviando..." : contact.form.submitLabel}
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm font-semibold uppercase tracking-widest ${status === "success" ? "text-[#3f7f3d]" : "text-[#a04c2d]"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </section>
  );
}
