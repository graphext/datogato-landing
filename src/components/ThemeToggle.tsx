"use client";

import { useEffect, useRef, useState } from "react";

import {
  isThemeName,
  THEME_CHANGE_EVENT,
  THEME_CLASSES,
  THEME_FAVICON_DESCRIPTORS,
  THEME_FAVICON_MASK_COLORS,
  THEME_FAVICONS,
  THEME_LABELS,
  THEME_PREVIEW_COLORS,
  THEMES,
  type ThemeName,
} from "@/lib/theme";

declare global {
  interface Window {
    __applyThemeFavicons?: (theme: ThemeName) => void;
  }
}

const resolveHref = (href: string) => {
  if (typeof window === "undefined") {
    return href;
  }

  try {
    return new URL(href, window.location.origin).href;
  } catch {
    return href;
  }
};

const updateFavicons = (theme: ThemeName) => {
  if (typeof document === "undefined") {
    return;
  }

  const href = THEME_FAVICONS[theme];
  const resolvedHref = resolveHref(href);

  if (typeof window !== "undefined" && typeof window.__applyThemeFavicons === "function") {
    window.__applyThemeFavicons(theme);
    return;
  }

  const managedSelector = (rel: string) => `link[data-theme-managed="true"][data-theme-rel="${rel}"]`;

  document
    .querySelectorAll('link[rel*="icon"]:not([data-theme-managed="true"]), link[rel="apple-touch-icon"]:not([data-theme-managed="true"]), link[rel="mask-icon"]:not([data-theme-managed="true"])')
    .forEach((node) => {
      node.parentNode?.removeChild(node);
    });

  THEME_FAVICON_DESCRIPTORS.forEach((descriptor) => {
    let link = document.head?.querySelector(managedSelector(descriptor.rel)) as HTMLLinkElement | null;

    if (!link) {
      link = document.head?.querySelector(`link[rel="${descriptor.rel}"]`) as HTMLLinkElement | null;
    }

    if (!link) {
      link = document.createElement("link");
      document.head?.appendChild(link);
    }

    if (!link) {
      return;
    }

    link.setAttribute("data-theme-managed", "true");
    link.setAttribute("data-theme-rel", descriptor.rel);
    if (descriptor.maskColor) {
      const maskColor = THEME_FAVICON_MASK_COLORS[theme] ?? THEME_FAVICON_MASK_COLORS.default;
      link.setAttribute("color", maskColor);
    } else {
      link.removeAttribute("color");
    }
    link.rel = descriptor.rel;
    if (descriptor.type) {
      link.type = descriptor.type;
    } else {
      link.removeAttribute("type");
    }
    if (descriptor.sizes) {
      link.sizes = descriptor.sizes;
    } else {
      link.removeAttribute("sizes");
    }
    link.removeAttribute("media");
    link.href = resolvedHref;
  });
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const applyTheme = (nextTheme: ThemeName) => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.remove(...Object.values(THEME_CLASSES));

    if (nextTheme !== "default") {
      root.classList.add(THEME_CLASSES[nextTheme]);
    }

    root.dataset.theme = nextTheme;

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", nextTheme);
    }

    setTheme(nextTheme);
    updateFavicons(nextTheme);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
          detail: { theme: nextTheme },
        }),
      );
    }
  };

  useEffect(() => {
    const root = typeof document !== "undefined" ? document.documentElement : null;
    const storedTheme = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    const datasetTheme = root?.dataset.theme;
    const initialThemeCandidate = datasetTheme ?? storedTheme;
    const initialTheme = isThemeName(initialThemeCandidate) ? initialThemeCandidate : "default";

    setTheme(initialTheme);

    if (!root) {
      updateFavicons(initialTheme);
      setMounted(true);
      return;
    }

    const expectedClass = initialTheme !== "default" ? THEME_CLASSES[initialTheme] : undefined;
    const hasExpectedClass = expectedClass ? root.classList.contains(expectedClass) : true;
    const datasetMatches = root.dataset.theme === initialTheme;

    if (!hasExpectedClass || !datasetMatches) {
      applyTheme(initialTheme);
    } else {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", initialTheme);
      }
      updateFavicons(initialTheme);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handler = ((event: Event) => {
      const customEvent = event as CustomEvent<{ theme?: unknown }>;
      const detailTheme = customEvent.detail?.theme;
      if (isThemeName(detailTheme)) {
        setTheme((prev) => (prev === detailTheme ? prev : detailTheme));
      }
    }) as EventListener;

    window.addEventListener(THEME_CHANGE_EVENT, handler);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handler);
    };
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
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-card-bg" />
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
        className="inline-flex items-center gap-1.5 rounded-full border border-theme bg-card px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-foreground transition hover:bg-input-bg hover:shadow-[4px_6px_0_var(--shadow-lg)]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Seleccionar tema de color"
      >
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-card-bg" />
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
                      ? "bg-input-bg text-foreground"
                      : "text-foreground hover:bg-input-bg"
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

