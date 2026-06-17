"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   CLIENT NAMES
   Replace with your actual clients. Intentionally no logos —
   name-only forces the reader to recognise the brand, which
   signals confidence rather than needing visual proof.
───────────────────────────────────────────────────────────── */
const clients = [
  "Dima Discount Market",
  "Hamburg XL",
  "Katsu Express",
  "Macro Cineplex",
  "Deniz Gül",
  "Hamburg Burger",
  "Mida Gıda",
] as const;

/* ─────────────────────────────────────────────────────────────
   TRUSTED BY
   A compact typographic strip — border-top and border-bottom
   define its edges. No background fill, no padding drama.

   Desktop target height: 140–160px.
   Mobile: allowed to grow as names wrap.
───────────────────────────────────────────────────────────── */
export default function TrustedBy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -4% 0px" });

  return (
    <section
      ref={ref}
      id="trusted-by"
      aria-label="Trusted By"
      className="border-y border-border bg-canvas px-6 py-10 md:px-10 md:py-12 lg:px-16"
    >
      {/* ── HEADER ROW ──────────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <motion.p
          className="label text-text-muted shrink-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
        >
          Birlikte Çalıştığımız Markalar
        </motion.p>

        <motion.p
          className="font-body text-xs text-text-muted sm:text-right"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_CINEMATIC }}
        >
          Attach Studio&apos;ya güvenen markalar, ağırlama grupları ve sanatçılar.
        </motion.p>
      </div>

      {/* ── CLIENT NAMES ────────────────────────────────────── */}
      {/*
        Desktop: single row, names spread evenly across full width.
        Mobile:  2-row grid of 3 — avoids horizontal overflow.
      */}
      <div
        className="
          grid grid-cols-3 gap-y-4
          sm:flex sm:items-center sm:justify-between
        "
        role="list"
        aria-label="Clients"
      >
        {clients.map((name, i) => (
          <motion.span
            key={name}
            role="listitem"
            className="
              font-display text-sm font-medium tracking-[0.02em]
              text-text/40
              transition-colors duration-300
              hover:text-text/75
              sm:text-center
            "
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.06,
              ease: EASE_CINEMATIC,
            }}
          >
            {name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
