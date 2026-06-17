import type { Metadata } from "next";
import { Space_Grotesk, Inter, Syne } from "next/font/google";
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
  title: "Attach Studio — We Attach Value. We Create Impact.",
  description:
    "A premium creative media agency delivering social media management, AI-powered content, video production, commercials, branding, and digital marketing.",
  keywords: [
    "creative agency",
    "social media management",
    "video production",
    "branding",
    "digital marketing",
    "AI content",
    "Attach Studio",
  ],
  openGraph: {
    title: "Attach Studio",
    description: "Attach Value. Create Impact.",
    type: "website",
  },
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
      lang="en"
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
      </body>
    </html>
  );
}
