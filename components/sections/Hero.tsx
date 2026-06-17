"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

/* Parent container — stagger children in sequence */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

/* Individual word — slides up from a clip mask (cinematic reveal) */
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: EASE_CINEMATIC },
  },
};

/* ─────────────────────────────────────────────────────────────
   HERO
   Full-viewport section. Layout (bottom-aligned content):
   ┌─────────────────────────────────────────────────────┐
   │  [VIDEO PLACEHOLDER — full bleed bg]                │
   │                                                     │
   │  Gradient overlay (canvas → transparent → canvas)   │
   │                                                     │
   │  CREATIVE MEDIA AGENCY         ← section label     │
   │                                                     │
   │  Attach Value.                 ← display headline   │
   │  Create Impact.                                     │
   │                                                     │
   │  One sentence subline copy.    ← subline            │
   │                                                     │
   │  [▶ Watch Showreel]  [Our Work →]  ← CTAs           │
   │                                                     │
   │  ── scroll indicator ──                             │
   └─────────────────────────────────────────────────────┘
───────────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  /* Headline words — each rendered in an overflow:hidden clip */
  const line1 = ["Markanıza", "Değer", "Katarız."];
  const line2 = ["Etki", "Yaratırız."];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[78vh] flex-col overflow-hidden bg-canvas"
      aria-label="Hero"
    >
      {/* ── VIDEO PLACEHOLDER ────────────────────────────────── */}
      {/*
        REPLACE: swap this div for a <video> element.
        Example:
          <video
            autoPlay muted loop playsInline
            src="/video/showreel.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Dark ambient gradient stands in for the video mood */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-canvas to-[#050505]" />

        {/* Dashed placeholder frame — remove once real video is in */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-8 py-6 text-center opacity-20">
          <span className="label text-text-muted">Video Placeholder</span>
          <p className="font-body text-xs text-text-muted max-w-[24ch]">
            Replace with showreel.mp4 via a &lt;video&gt; element
          </p>
        </div>
      </div>

      {/* ── GRADIENT OVERLAYS ────────────────────────────────── */}
      {/* Top fade — nav readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas to-transparent z-10"
      />
      {/* Bottom fade — content readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-canvas via-canvas/80 to-transparent z-10"
      />

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-20 mt-[18vh] px-6 pb-16 md:px-10 lg:px-16">

        {/* Section label */}
        <motion.p
          className="label mb-8 text-text-muted"
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_CINEMATIC }}
        >
          Yaratıcı Medya Ajansı
        </motion.p>

        {/* Headline — each word clipped and revealed */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8"
        >
          {/* Line 1 */}
          <div className="flex flex-wrap gap-x-[0.25em] overflow-hidden">
            {line1.map((word) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  variants={wordVariants}
                  className="
                    block font-display font-semibold leading-[0.92]
                    text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw]
                    tracking-[-0.02em] text-text
                  "
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Line 2 — "Impact." highlighted in lime */}
          <div className="flex flex-wrap gap-x-[0.25em] overflow-hidden">
            {line2.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  variants={wordVariants}
                  className={`
                    block font-display font-semibold leading-[0.92]
                    text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw]
                    tracking-[-0.02em]
                    ${i === 1 ? "text-accent" : "text-text"}
                  `}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subline + CTAs row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          {/* Subline */}
          <motion.p
            className="font-body text-base text-text-muted max-w-[36ch] leading-relaxed"
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE_CINEMATIC }}
          >
            Strateji, içerik üretimi ve prodüksiyonla markaların büyümesine yardımcı oluyoruz.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-4 shrink-0"
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE_CINEMATIC }}
          >
            {/* Primary CTA — Watch Showreel */}
            <button
              data-cursor-hover
              onClick={scrollToContact}
              className="
                group flex items-center gap-3
                font-label text-[0.6875rem] font-semibold tracking-[0.14em] uppercase
                bg-accent text-canvas
                px-6 py-3.5 rounded-full
                transition-all duration-300
                hover:bg-accent-dim hover:gap-4
              "
              aria-label="Watch showreel"
            >
              <span
                className="
                  flex h-5 w-5 items-center justify-center rounded-full
                  bg-canvas/20 text-[0.6rem]
                "
                aria-hidden="true"
              >
                ▶
              </span>
              Showreel İzle
            </button>

            {/* Secondary CTA — Our Work */}
            <button
              data-cursor-hover
              onClick={scrollToWork}
              className="
                font-label text-[0.6875rem] font-semibold tracking-[0.14em] uppercase
                text-text-muted
                px-6 py-3.5 rounded-full
                border border-border
                transition-all duration-300
                hover:text-text hover:border-text/30
              "
              aria-label="View our work"
            >
              İşlerimiz →
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6, ease: EASE_CINEMATIC }}
          aria-hidden="true"
        >
          <div className="h-px w-8 bg-border" />
          <span className="label text-border">Kaydır</span>
          <motion.div
            className="h-4 w-px bg-text-muted origin-top"
            animate={{ scaleY: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
