import Link from "next/link";
import { hero } from "@/lib/content";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[48px] border border-theme bg-texture py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--card-bg),transparent_60%)]" />
      <div className="flex flex-col gap-12 px-6 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-16">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-theme-dark bg-input px-4 py-2 text-xs font-semibold uppercase text-accent-dark shadow-[4px_6px_0_var(--shadow-lg)]">
            {hero.badge}
          </span>
          <h1 className="section-title text-4xl leading-tight sm:text-5xl">
            {hero.title}
          </h1>
          <p className="max-w-xl text-lg text-foreground-80">
            SEO para <strong>visibilidad en IA</strong>. {hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={hero.ctaPrimary.target}
              className="group inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[var(--card-bg)] shadow-[6px_10px_0_var(--shadow-strong)] transition hover:translate-y-0.5 hover:bg-[var(--accent-dark)]"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.target}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-accent transition hover:bg-[var(--input-bg)]"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex max-w-sm flex-1 justify-center">
          <div className="relative w-full max-w-[384px]">
            <Image
              src="/assets/image.png"
              alt="Ilustración de gato y modelos de IA"
              width={384}
              height={256}
              className="h-auto w-full drop-shadow-accent"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
