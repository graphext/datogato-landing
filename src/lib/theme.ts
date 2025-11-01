export const THEMES = ["default", "grey", "green", "dark"] as const;

export type ThemeName = (typeof THEMES)[number];

export const THEME_LABELS: Record<ThemeName, string> = {
  default: "Tema Beige",
  grey: "Tema Gris",
  green: "Tema Verde",
  dark: "Tema Oscuro",
};

export const THEME_CLASSES: Record<Exclude<ThemeName, "default">, string> = {
  grey: "theme-grey",
  green: "theme-green",
  dark: "theme-dark",
};

export const THEME_PREVIEW_COLORS: Record<ThemeName, string> = {
  default: "#a04c2d",
  grey: "#636363",
  green: "#2c8a4d",
  dark: "#38bdf8",
};

export const THEME_FAVICONS: Record<ThemeName, string> = {
  default: "/favicon_gatodato.svg",
  grey: "/favicon_gatodato-grey.svg",
  green: "/favicon_gatodato-green.svg",
  dark: "/favicon_gatodato-dark.svg",
};

export const THEME_CHANGE_EVENT = "themechange";

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value as string);
}

