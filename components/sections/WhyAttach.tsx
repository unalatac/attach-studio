"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   PRINCIPLES DATA
───────────────────────────────────────────────────────────── */
const principles = [
  { number: "01", line1: "Strateji",  line2: "Önce"        },
  { number: "02", line1: "Premium",   line2: "Prodüksiyon" },
  { number: "03", line1: "AI",        line2: "Destekli"    },
  { number: "04", line1: "Hızlı",     line2: "Teslimat"    },
  { number: "05", line1: "Büyüme",    line2: "Odaklı"      },
] as const;

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_CINEMATIC } },
};

/* ─────────────────────────────────────────────────────────────
   WHY ATTACH
   A single horizontal strip — five principles across the full
   width, separated only by 1px vertical hairlines.

   Desktop layout (lg+):
   ┌──────────┬──────────┬──────────┬──────────┬──────────┐
   │ 01       │ 02       │ 03       │ 04       │ 05       │
   │ Strategy │ Premium  │ AI       │ Fast     │ Built For│
   │ First    │ Produc.  │ Enhanced │ Execution│ Growth   │
   └──────────┴──────────┴──────────┴──────────┴──────────┘

   Mobile: vertical numbered list, each row bordered top/bottom.
   Max section height desktop: ~260px.
───────────────────────────────────────────────────────────── */
export default function WhyAttach() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -4% 0px" });

  return (
    <section
      ref={ref}
      id="why-attach"
      className="border-t border-border bg-canvas px-6 pt-12 pb-14 md:px-10 md:pt-14 md:pb-16 lg:px-16"
      aria-label="Why Attach"
    >
      {/* ── HEADER ROW ──────────────────────────────────────── */}
      <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.p
            className="label mb-4 text-text-muted"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          >
            Neden Attach
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="
                font-display font-semibold tracking-[-0.02em] leading-[0.95] text-text
                text-[8vw] sm:text-[5.5vw] md:text-[4vw] lg:text-[2.8vw]
              "
              initial={{ y: "105%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE_CINEMATIC }}
            >
              Sadece İçerik Üretmiyoruz,<br />
              <span className="text-accent">Markalara Etki Kazandırıyoruz.</span>
            </motion.h2>
          </div>
        </div>

        <motion.p
          className="font-body text-sm text-text-muted max-w-[38ch] leading-relaxed md:text-right md:shrink-0"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_CINEMATIC }}
        >
          Her içerik bir amaca hizmet etmeli. Biz tasarımı, stratejiyi ve teknolojiyi bir araya getirerek markalar için gerçek sonuçlar üreten çalışmalar geliştiriyoruz.
        </motion.p>
      </div>

      {/* ── DESKTOP: five equal columns ─────────────────────── */}
      <motion.div
        className="hidden lg:flex"
        variants={listVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        role="list"
      >
        {principles.map((p, i) => (
          <motion.div
            key={p.number}
            role="listitem"
            variants={itemVariants}
            className="
              group flex-1 flex flex-col justify-between gap-5
              border-l border-border px-6 pt-1 pb-1
              first:border-l-0 first:pl-0
              transition-colors duration-300
              cursor-default
            "
          >
            {/* Number */}
            <span
              className="
                font-label text-[0.6rem] font-semibold tracking-[0.2em] text-border
                transition-colors duration-300 group-hover:text-accent
              "
            >
              {p.number}
            </span>

            {/* Principle name — two lines locked */}
            <div>
              <p
                className="
                  font-display font-semibold leading-[1.05] tracking-[-0.01em]
                  text-text-muted/60
                  transition-colors duration-300 group-hover:text-text
                  text-[1.35vw] xl:text-[1.2vw]
                "
              >
                {p.line1}
              </p>
              <p
                className="
                  font-display font-semibold leading-[1.05] tracking-[-0.01em]
                  text-text-muted/60
                  transition-colors duration-300 group-hover:text-text
                  text-[1.35vw] xl:text-[1.2vw]
                "
              >
                {p.line2}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── MOBILE / TABLET: vertical numbered list ──────────── */}
      <motion.div
        className="flex flex-col lg:hidden"
        variants={listVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        role="list"
      >
        {principles.map((p) => (
          <motion.div
            key={p.number}
            role="listitem"
            variants={itemVariants}
            className="
              group flex items-center justify-between
              border-t border-border py-4
              last:border-b
            "
          >
            {/* Number */}
            <span className="font-label text-[0.6rem] font-semibold tracking-[0.2em] text-border w-8 shrink-0">
              {p.number}
            </span>

            {/* Name — single line on mobile */}
            <p className="font-display font-semibold tracking-[-0.01em] text-text-muted/70 text-base flex-1">
              {p.line1} {p.line2}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
