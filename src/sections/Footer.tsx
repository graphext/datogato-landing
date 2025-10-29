import Link from "next/link";
import { brand, footer } from "@/lib/content";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-theme pt-10 text-sm text-foreground-70">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="section-title text-lg">{brand.name}</h3>
          <p>Especialistas en visibilidad IA desde Madrid.</p>
        </div>
        <nav className="flex flex-wrap gap-4 uppercase tracking-widest text-xs">
          {footer.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--accent)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <nav className="flex gap-4">
            {footer.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--accent)]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
