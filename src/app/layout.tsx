import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Cherry_Cream_Soda } from "next/font/google";
import { Header } from "@/sections/Header";
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

const title = "Gatodato · Mejor Agencia para Visibilidad en AI de España";
const description =
  "Gatodato potencia la visibilidad en ChatGPT, Google AI Overview, Gemini, Perplexity y Grok con estrategias SEO diseñadas para modelos de IA.";
const url = "https://gatodato.com";

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
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg" },
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
    <html lang="es">
      <body className={`${manrope.variable} ${cherryCream.variable} antialiased scroll-smooth`}>
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
          <div className="pointer-events-auto">
            <Header />
          </div>
        </div>
        <div className="pt-[20px] sm:pt-[20px] lg:pt-[20px]">{children}</div>
      </body>
    </html>
  );
}
