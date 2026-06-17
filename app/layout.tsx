import type { Metadata } from "next";
import { Space_Grotesk, Inter, Syne } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";

/* ─────────────────────────────────────────────────────────────
   FONTS
   Each font exposes a CSS variable consumed by globals.css tokens.
   - Space Grotesk → --font-space-grotesk  (display / headings)
   - Inter          → --font-inter          (body copy)
   - Syne           → --font-syne           (labels / accent)
───────────────────────────────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

/* ─────────────────────────────────────────────────────────────
   METADATA
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://studioattach.com"),
  title: "Attach Studio | Kıbrıs Sosyal Medya ve Kreatif Ajans",
  description:
    "Kıbrıs'ta sosyal medya yönetimi, video prodüksiyon, yapay zeka destekli içerik üretimi ve dijital pazarlama hizmetleri sunuyoruz.",
  keywords: [
    "Kıbrıs sosyal medya ajansı",
    "Lefkoşa reklam ajansı",
    "KKTC reklam ajansı",
    "Kıbrıs video prodüksiyon",
    "Kıbrıs içerik üretimi",
    "Kıbrıs dijital pazarlama",
    "KKTC sosyal medya yönetimi",
  ],
  openGraph: {
    title: "Attach Studio | Kıbrıs Sosyal Medya ve Kreatif Ajans",
    description:
      "Kıbrıs'ta sosyal medya yönetimi, video prodüksiyon, yapay zeka destekli içerik üretimi ve dijital pazarlama hizmetleri sunuyoruz.",
    url: "https://studioattach.com",
    siteName: "Attach Studio",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attach Studio | Kıbrıs Sosyal Medya ve Kreatif Ajans",
    description:
      "Kıbrıs'ta sosyal medya yönetimi, video prodüksiyon, yapay zeka destekli içerik üretimi ve dijital pazarlama hizmetleri sunuyoruz.",
  },
};

/* ─────────────────────────────────────────────────────────────
   SCHEMA.ORG — Organization structured data
───────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Attach Studio",
  url: "https://studioattach.com",
  logo: "https://studioattach.com/icon.png",
  description:
    "Kıbrıs'ta sosyal medya yönetimi, video prodüksiyon, yapay zeka destekli içerik üretimi ve dijital pazarlama hizmetleri sunuyoruz.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CY",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905428544838",
    contactType: "customer service",
    email: "hello@studioattach.com",
  },
  sameAs: [
    "https://www.instagram.com/studioattach",
    "https://linkedin.com/company/studioattach/",
  ],
};

/* ─────────────────────────────────────────────────────────────
   ROOT LAYOUT
   Font variables are injected on <html> so every component
   can reference them via var(--font-*) or the Tailwind tokens.
───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`
        ${spaceGrotesk.variable}
        ${inter.variable}
        ${syne.variable}
        h-full antialiased
      `}
    >
      <body className="bg-canvas text-text font-body min-h-full">
        {/* Custom cursor — renders null on server / touch devices */}
        <CustomCursor />

        {/* Film grain overlay — fixed, pointer-events: none */}
        <GrainOverlay />

        {children}
        <GoogleAnalytics gaId="G-96WCDLVXC9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
