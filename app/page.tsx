import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TrustedBy from "@/components/sections/TrustedBy";
import Work from "@/components/sections/Work";
import WhyAttach from "@/components/sections/WhyAttach";
import ContactCTA from "@/components/sections/ContactCTA";

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
   One-page layout. Sections assembled top-to-bottom.
   Additional sections (Services, Work, Process) will be added
   in subsequent build phases.
───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        {/* 01 — Hero (full viewport) */}
        <Hero />

        {/* 02 — Services */}
        <Services />

        {/* 03 — Trusted By */}
        <TrustedBy />

        {/* 04 — Selected Work */}
        <Work />

        {/* 05 — Why Attach */}
        <WhyAttach />

        {/* 06 — Contact / CTA */}
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
