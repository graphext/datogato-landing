import Link from "next/link";
import { Lato } from "next/font/google";

const navigation = [
  { label: "Metodología", href: "#metodologia" },
  { label: "Casos", href: "#casos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Blog", href: "/blog" },
];

const lato = Lato({ subsets: ["latin"], weight: "700" });

export function Header() {
  return (
    <header className="backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-[#d9b38a] bg-[#fdf2e3]/90 px-6 py-3 shadow-[6px_10px_0_rgba(92,46,26,0.18)] transition sm:px-10">
        <Link
          href="/"
          className={`${lato.className} text-lg lowercase text-[#5c2e1a] transition hover:text-[#a04c2d] sm:text-xl`}
        >
          gatodato
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase text-[#5c2e1a]/80 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#a04c2d]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#contacto"
          className="inline-flex items-center justify-center rounded-full bg-[#a04c2d] px-5 py-2 text-xs font-semibold uppercase text-[#fdf2e3] shadow-[4px_6px_0_rgba(92,46,26,0.25)] transition hover:translate-y-0.5 hover:bg-[#8c3f1f] sm:px-6"
        >
          Hablemos
        </Link>
      </div>
      <div className="mx-auto mt-4 flex max-w-6xl justify-center lg:hidden">
        <nav className="flex flex-wrap items-center justify-center gap-4 rounded-full border border-[#d9b38a] bg-[#fdf2e3]/90 px-4 py-2 text-[0.65rem] font-semibold uppercase text-[#5c2e1a]/80 shadow-[4px_6px_0_rgba(92,46,26,0.18)]">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#a04c2d]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

