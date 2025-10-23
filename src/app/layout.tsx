import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Cherry_Cream_Soda } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cherryCream = Cherry_Cream_Soda({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cherry",
  display: "swap",
});

const title = "Datogato · Agencia SEO IA en Madrid";
const description =
  "Datogato potencia la visibilidad en ChatGPT, Google AI Overview, Gemini, Perplexity y Grok con estrategias SEO diseñadas para modelos de IA.";
const url = "https://datogato.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: "%s · Datogato",
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
    siteName: "Datogato",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
    name: "Datogato",
    url,
    description,
    logo: `${url}/og-image.jpg`,
    sameAs: [
      "https://www.linkedin.com/company/datogato",
      "https://x.com/datogato",
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
      email: "hola@datogato.com",
      telephone: "+34 910 000 000",
      availableLanguage: ["es", "en"],
    },
  };

  return (
    <html lang="es">
      <body className={`${manrope.variable} ${cherryCream.variable} antialiased`}>
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        {children}
      </body>
    </html>
  );
}
