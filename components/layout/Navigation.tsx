"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   NAVIGATION
   Sticky minimal nav. Two states:
   - At top: fully transparent background
   - Scrolled: dark surface background with subtle border

   Layout:
   [ATTACH STUDIO]          [Get in Touch →]
───────────────────────────────────────────────────────────── */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[500]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
    >
      <motion.div
        className="mx-auto flex items-center justify-between px-6 py-5 md:px-10 lg:px-16"
        animate={{
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.92)"
            : "rgba(10, 10, 10, 0)",
          borderBottomColor: scrolled
            ? "rgba(42, 42, 42, 1)"
            : "rgba(42, 42, 42, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        {/* Wordmark */}
        <a
          href="/"
          className="font-display font-semibold tracking-[0.06em] text-text text-sm uppercase accent-underline"
          aria-label="Attach Studio — Home"
        >
          Attach Studio
        </a>

        {/* CTA */}
        <button
          onClick={scrollToContact}
          data-cursor-hover
          className="
            group relative overflow-hidden
            font-label text-[0.6875rem] font-semibold tracking-[0.14em] uppercase
            px-5 py-2.5
            rounded-full
            border border-accent/40
            text-accent
            transition-colors duration-300
            hover:border-accent
          "
          aria-label="Navigate to contact section"
        >
          {/* Lime fill slides in on hover */}
          <span
            className="
              absolute inset-0 rounded-full bg-accent
              translate-y-full group-hover:translate-y-0
              transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]
            "
            aria-hidden="true"
          />
          <span className="relative z-10 group-hover:text-canvas transition-colors duration-300">
            Teklif Al
          </span>
        </button>
      </motion.div>
    </motion.header>
  );
}
