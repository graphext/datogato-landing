"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = ["default", "grey", "green"] as const;
type ThemeName = (typeof THEMES)[number];

const THEME_LABELS: Record<ThemeName, string> = {
  default: "Tema Beige",
  grey: "Tema Gris",
  green: "Tema Verde",
};

const THEME_CLASSES: Record<Exclude<ThemeName, "default">, string> = {
  grey: "theme-grey",
  green: "theme-green",
};

const THEME_PREVIEW_COLORS: Record<ThemeName, string> = {
  default: "#a04c2d",
  grey: "#636363",
  green: "#2c8a4d",
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const applyTheme = (nextTheme: ThemeName) => {
    const root = document.documentElement;
    root.classList.remove(...Object.values(THEME_CLASSES));

    if (nextTheme !== "default") {
      root.classList.add(THEME_CLASSES[nextTheme]);
    }

    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as ThemeName | null;
    const initialTheme = savedTheme && THEMES.includes(savedTheme) ? savedTheme : "default";

    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const buttonLabel = THEME_LABELS[theme];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-full border border-theme bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground opacity-50"
        aria-label="Loading theme toggle"
      >
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[var(--accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--card-bg)]" />
        </span>
        Cargando...
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 rounded-full border border-theme bg-card px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-foreground transition hover:bg-[var(--input-bg)] hover:shadow-[4px_6px_0_var(--shadow-lg)]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Seleccionar tema de color"
      >
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[var(--accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--card-bg)]" />
        </span>
        {buttonLabel}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          className="absolute bottom-full right-0 mb-2.5 w-44 overflow-hidden rounded-2xl border border-theme bg-card shadow-[8px_12px_0_var(--shadow-md)]"
          role="listbox"
          aria-label="Temas disponibles"
        >
          {THEMES.map((option) => {
            const isActive = option === theme;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[0.6rem] font-semibold uppercase tracking-[0.25em] transition ${
                    isActive
                      ? "bg-[var(--input-bg)] text-foreground"
                      : "text-foreground hover:bg-[var(--input-bg)]"
                  }`}
                  onClick={() => {
                    applyTheme(option);
                    setOpen(false);
                  }}
                >
                  <span
                    className="inline-flex h-3 w-3 items-center justify-center rounded-full"
                    style={{ backgroundColor: THEME_PREVIEW_COLORS[option] }}
                    aria-hidden="true"
                  />
                  <span>{THEME_LABELS[option]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

