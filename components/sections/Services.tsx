"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    name: "Sosyal Medya Yönetimi",
    description: "Markanızı büyüten içerik ve yayın stratejileri.",
  },
  {
    number: "02",
    name: "AI Destekli İçerik",
    description: "Makine hızında fikir. İnsan kalitesinde çıktı.",
  },
  {
    number: "03",
    name: "Video Prodüksiyon",
    description: "Konseptten kurguya profesyonel hikaye anlatımı.",
  },
  {
    number: "04",
    name: "Reklam Filmi",
    description: "Dikkat çeken, dönüşüm odaklı reklam içerikleri.",
  },
  {
    number: "05",
    name: "Marka Kimliği",
    description: "Akılda kalan ve güven oluşturan marka sistemleri.",
  },
  {
    number: "06",
    name: "Dijital Pazarlama",
    description: "Performans odaklı kampanyalar ve sürdürülebilir büyüme.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

/* Stagger wrapper — triggers children one by one */
const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
};

/* Each row slides up and fades in from behind a clip */
const rowVariants: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: EASE_CINEMATIC },
  },
};

/* Arrow travels diagonally on hover */
const arrowVariants: Variants = {
  rest: { x: -6, y: 6, opacity: 0 },
  hover: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_CINEMATIC },
  },
};

/* ─────────────────────────────────────────────────────────────
   SERVICE ROW
   Full-width editorial row. Desktop layout:
   [number] — [service name] ————— [description] — [↗]
   Mobile: stacked two lines.
───────────────────────────────────────────────────────────── */
function ServiceRow({
  number,
  name,
  description,
  index,
}: {
  number: string;
  name: string;
  description: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={rowVariants}>
      {/* Top border — only rendered on first item; others use the bottom border of the row above */}
      {index === 0 && (
        <div className="h-px w-full bg-border" />
      )}

      <motion.div
        className="group relative flex items-center gap-6 py-7 md:py-8 lg:py-9 cursor-pointer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={hovered ? "hover" : "rest"}
        initial="rest"
        data-cursor-hover
      >
        {/* Hover background fill — slides up from bottom */}
        <motion.div
          className="pointer-events-none absolute inset-0 -mx-6 md:-mx-10 lg:-mx-16 bg-surface-alt"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: hovered ? 1 : 0, originY: 1 }}
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
          aria-hidden="true"
        />

        {/* Number */}
        <motion.span
          className="relative z-10 font-label text-[0.6875rem] font-semibold tracking-[0.16em] shrink-0 w-8"
          animate={{
            color: hovered ? "#C8FF00" : "#8A8A80",
          }}
          transition={{ duration: 0.25 }}
        >
          {number}
        </motion.span>

        {/* Service name */}
        <motion.h3
          className="relative z-10 font-display font-semibold tracking-[-0.01em] text-text leading-none flex-1
            text-[6.5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.4vw] xl:text-[2vw]"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.35, ease: EASE_CINEMATIC }}
        >
          {name}
        </motion.h3>

        {/* Description — hidden on mobile, right-column on desktop */}
        <motion.p
          className="relative z-10 hidden md:block font-body text-sm text-text-muted leading-relaxed
            w-[34ch] lg:w-[38ch] shrink-0 text-right"
          animate={{ opacity: hovered ? 1 : 0.45 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Arrow ↗ */}
        <div className="relative z-10 shrink-0 w-6 h-6 hidden sm:flex items-center justify-center overflow-hidden">
          <motion.span
            className="text-accent text-sm leading-none font-light"
            variants={arrowVariants}
            aria-hidden="true"
          >
            ↗
          </motion.span>
        </div>
      </motion.div>

      {/* Mobile description — below name, always visible */}
      <p className="block md:hidden font-body text-xs text-text-muted pb-5 leading-relaxed pl-14">
        {description}
      </p>

      {/* Bottom border */}
      <div className="h-px w-full bg-border" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICES SECTION
   Editorial full-width list. No cards, no grid.
───────────────────────────────────────────────────────────── */
export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative bg-canvas px-6 py-28 md:px-10 md:py-36 lg:px-16"
      aria-label="Services"
    >
      {/* ── HEADER ──────────────────────────────────────────── */}
      <div className="mb-16 md:mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

        <div>
          <motion.p
            className="label mb-4 text-text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          >
            Hizmetlerimiz
          </motion.p>

          {/* Overflow clip for headline reveal */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-semibold tracking-[-0.02em] leading-[1.05] text-text
                text-[8.5vw] sm:text-[6vw] md:text-[4.5vw] lg:text-[3.2vw]"
              initial={{ y: "105%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE_CINEMATIC }}
            >
              İhtiyacınız Olan Her Şey,<br />
              <span className="text-accent">Tek Çatı Altında.</span>
            </motion.h2>
          </div>
        </div>

        {/* Right-aligned qualifier text */}
        <motion.p
          className="font-body text-sm text-text-muted max-w-[32ch] leading-relaxed md:text-right shrink-0"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_CINEMATIC }}
        >
          Stratejiden üretime, içerikten performansa kadar markanızın dijital büyümesi için gereken tüm süreçleri yönetiyoruz.
        </motion.p>
      </div>

      {/* ── SERVICE LIST ────────────────────────────────────── */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        role="list"
      >
        {services.map((service, i) => (
          <div key={service.number} role="listitem">
            <ServiceRow
              number={service.number}
              name={service.name}
              description={service.description}
              index={i}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
