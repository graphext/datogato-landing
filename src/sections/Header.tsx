import Link from "next/link";

import { GatodatoWordmark } from "@/components/graphics/GatodatoWordmark";

const navigation = [
  { label: "Metodología", href: "/#metodologia" },
  { label: "Casos", href: "/#casos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  return (
    <header className="backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-theme bg-card-soft px-6 py-3 shadow-[6px_10px_0_var(--shadow-md)] transition sm:px-10">
        <Link href="/" className="flex items-center transition hover:opacity-90">
          <GatodatoWordmark className="h-8 sm:h-10 text-[var(--accent)]" />
          <span className="sr-only">Gatodato</span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase text-foreground-80 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--accent)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contacto"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-semibold uppercase text-[var(--card-bg)] shadow-[4px_6px_0_var(--shadow-2xl)] transition hover:translate-y-0.5 hover:bg-[var(--accent-dark)] sm:px-6"
        >
          Hablemos
        </Link>
      </div>
      <div className="mx-auto mt-4 flex max-w-6xl justify-center lg:hidden">
        <nav className="flex flex-wrap items-center justify-center gap-4 rounded-full border border-theme bg-card-soft px-4 py-2 text-[0.65rem] font-semibold uppercase text-foreground-80 shadow-[4px_6px_0_var(--shadow-md)]">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--accent)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

