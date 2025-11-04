import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { dmSans, cherryCream, lora } from "./fonts";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/sections/Header";
import { canonical } from "@/lib/metadata";
import {
  THEME_CHANGE_EVENT,
  THEME_CLASSES,
  THEME_FAVICON_DESCRIPTORS,
  THEME_FAVICONS,
  THEMES,
  THEME_FAVICON_MASK_COLORS,
} from "@/lib/theme";
import "./globals.css";

const title = "Gatodato · Mejor Agencia para Visibilidad en AI de España";
const description =
  "Gatodato potencia la visibilidad en ChatGPT, Google AI Overview, Gemini, Perplexity y Grok con estrategias SEO diseñadas para modelos de IA.";
const url = canonical;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const themeInitScript = `
  (function () {
    var themes = ${JSON.stringify(THEMES)};
    var themeClasses = ${JSON.stringify(THEME_CLASSES)};
    var favicons = ${JSON.stringify(THEME_FAVICONS)};
    var descriptors = ${JSON.stringify(THEME_FAVICON_DESCRIPTORS)};
    var maskColors = ${JSON.stringify(THEME_FAVICON_MASK_COLORS)};
    var changeEventName = ${JSON.stringify(THEME_CHANGE_EVENT)};
    var currentTheme = "default";

    function resolveHref(href) {
      try {
        return new URL(href, window.location.origin).href;
      } catch (urlError) {
        return href;
      }
    }

    function ensureManagedLink(descriptor, href, themeName) {
      if (!document.head) {
        return;
      }

      var link = document.head.querySelector('link[data-theme-managed="true"][data-theme-rel="' + descriptor.rel + '"]');

      if (!(link instanceof HTMLLinkElement)) {
        link = document.head.querySelector('link[rel="' + descriptor.rel + '"]');
      }

      if (!(link instanceof HTMLLinkElement)) {
        link = document.createElement("link");
        document.head.appendChild(link);
      }

      link.setAttribute("data-theme-managed", "true");
      link.setAttribute("data-theme-rel", descriptor.rel);
      if (descriptor.maskColor) {
        var maskColor = maskColors[themeName] || maskColors.default || "#000000";
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
      link.href = href;
      // Move to the end to increase precedence across browsers
      if (link.parentNode === document.head) {
        document.head.appendChild(link);
      }
    }

    function safeRemove(node) {
      if (!node) {
        return;
      }

      if (typeof node.remove === "function") {
        node.remove();
        return;
      }

      var parent = node.parentNode;
      if (parent && typeof parent.removeChild === "function") {
        parent.removeChild(node);
      }
    }

    function applyFaviconsForTheme(themeName) {
      currentTheme = themes.indexOf(themeName) !== -1 ? themeName : "default";
      var rawHref = favicons[currentTheme] || favicons.default;
      var href = resolveHref(rawHref);
      var versionedHref = href + (href.indexOf('?') === -1 ? ('?v=' + encodeURIComponent(themeName)) : ('&v=' + encodeURIComponent(themeName)));
      if (!href) {
        return;
      }

      // Do not delete or mutate unmanaged links (React/Next owns them).
      // Only ensure our managed favicon links exist and are updated.

      for (var d = 0; d < descriptors.length; d++) {
        ensureManagedLink(descriptors[d], versionedHref, currentTheme);
      }
    }

    try {
      var theme = "default";

      try {
        var stored = window.localStorage.getItem("theme");
        if (typeof stored === "string" && themes.indexOf(stored) !== -1) {
          theme = stored;
        }
      } catch (storageError) {}

      var root = document.documentElement;
      if (!root) {
        return;
      }

      for (var key in themeClasses) {
        if (Object.prototype.hasOwnProperty.call(themeClasses, key)) {
          root.classList.remove(themeClasses[key]);
        }
      }

      if (theme !== "default" && themeClasses[theme]) {
        root.classList.add(themeClasses[theme]);
      }

      root.setAttribute("data-theme", theme);

      var faviconHref = favicons[theme];
      applyFaviconsForTheme(theme);

      try {
        window.localStorage.setItem("theme", theme);
      } catch (writeError) {}

      if (typeof window.CustomEvent === "function") {
        window.dispatchEvent(new CustomEvent(changeEventName, { detail: { theme: theme } }));
      }

      try {
        window.__applyThemeFavicons = function (nextTheme) {
          applyFaviconsForTheme(nextTheme);
        };
      } catch (assignError) {}

      if (document.head) {
        var observer = new MutationObserver(function (mutations) {
          if (!currentTheme) {
            return;
          }

          var shouldReapply = false;

          for (var m = 0; m < mutations.length; m++) {
            var mutation = mutations[m];

            if (mutation.type === "childList") {
              for (var a = 0; a < mutation.addedNodes.length; a++) {
                var added = mutation.addedNodes[a];
                if (
                  added instanceof HTMLLinkElement &&
                  (added.rel === "icon" || added.rel === "shortcut icon" || added.rel === "apple-touch-icon") &&
                  added.getAttribute("data-theme-managed") !== "true"
                ) {
                  shouldReapply = true;
                  break;
                }
              }
              if (shouldReapply) {
                break;
              }
            }

            if (
              mutation.type === "attributes" &&
              mutation.target instanceof HTMLLinkElement &&
              (mutation.target.rel === "icon" || mutation.target.rel === "shortcut icon" || mutation.target.rel === "apple-touch-icon") &&
              mutation.target.getAttribute("data-theme-managed") !== "true"
            ) {
              shouldReapply = true;
              break;
            }
          }

          if (shouldReapply) {
            applyFaviconsForTheme(currentTheme);
          }
        });

        observer.observe(document.head, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["rel", "href", "media"],
        });
      }
    } catch (error) {}
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s · Gatodato",
  },
  description,
  keywords: [
    "SEO IA",
    "Visibilidad IA",
    "ChatGPT",
    "Google AI Overview",
    "Gemini",
    "Perplexity",
    "Grok",
    "Agencia SEO Madrid",
    "SEO para modelos de IA",
  ],
  openGraph: {
    title,
    description,
    url,
    type: "website",
    locale: "es_ES",
    siteName: "Gatodato",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [{ url: "/favicon_gatodato.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon_gatodato.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon_gatodato.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gatodato",
    url,
    description,
    logo: `${url}/og-image.jpg`,
    sameAs: [
      "https://www.linkedin.com/company/gatodato",
      "https://x.com/gatodato",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Gran Vía, 1",
      addressLocality: "Madrid",
      postalCode: "28013",
      addressCountry: "ES",
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "SEO para visibilidad en modelos de IA",
        areaServed: {
          "@type": "Place",
          name: "Madrid",
        },
        category: "DigitalMarketingService",
        description,
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hola@gatodato.com",
      telephone: "+34 910 000 000",
      availableLanguage: ["es", "en"],
    },
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/favicon_gatodato.svg" as="image" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${dmSans.className} ${dmSans.variable} ${cherryCream.variable} ${lora.variable} antialiased scroll-smooth`}
      >
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  anonymize_ip: true,
                });
              `}
            </Script>
          </>
        ) : null}
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
          <div className="pointer-events-auto">
            <Header />
          </div>
        </div>
        <div>{children}</div>
        {GA_MEASUREMENT_ID ? (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          </Suspense>
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
