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
    var changeEventName = ${JSON.stringify(THEME_CHANGE_EVENT)};

    function resolveHref(href) {
      try {
        return new URL(href, window.location.origin).href;
      } catch (urlError) {
        return href;
      }
    }

    function replaceManagedFavicons(href) {
      if (!document.head || !href) {
        return;
      }

      var existing = document.querySelectorAll('link[data-theme-managed="true"], link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
      for (var i = 0; i < existing.length; i++) {
        var node = existing[i];
        if (node && node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }

      for (var d = 0; d < descriptors.length; d++) {
        var descriptor = descriptors[d];
        var link = document.createElement("link");
        link.setAttribute("data-theme-managed", "true");
        link.setAttribute("data-theme-rel", descriptor.rel);
        link.rel = descriptor.rel;
        if (descriptor.type) {
          link.type = descriptor.type;
        }
        link.href = href;
        document.head.appendChild(link);
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
      if (faviconHref) {
        replaceManagedFavicons(resolveHref(faviconHref));
      }

      try {
        window.localStorage.setItem("theme", theme);
      } catch (writeError) {}

      if (typeof window.CustomEvent === "function") {
        window.dispatchEvent(new CustomEvent(changeEventName, { detail: { theme: theme } }));
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
    icon: [
      { url: "/favicon_gatodato.svg", type: "image/svg+xml" },
      { url: "/favicon_gatodato.svg", rel: "shortcut icon" },
    ],
    apple: [
      { url: "/favicon_gatodato.svg" },
    ],
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
