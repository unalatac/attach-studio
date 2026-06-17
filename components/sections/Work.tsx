"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animation";

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────── */
const projects = [
  {
    index: "01",
    category: "Restaurant",
    title: "Katsu\nExpress",
    year: "2024",
    placeholderFrom: "#100C07",
    placeholderTo:   "#1C1409",
    lightA: "rgba(220,160,60,0.07)",
    lightB: "rgba(200,255,0,0.03)",
    fileName: "katsu-express.jpg",
  },
  {
    index: "02",
    category: "Supermarket",
    title: "Dima Discount\nMarket",
    year: "2024",
    placeholderFrom: "#060D0C",
    placeholderTo:   "#0A1614",
    lightA: "rgba(60,200,180,0.07)",
    lightB: "rgba(200,255,0,0.02)",
    fileName: "dima-discount-market.jpg",
  },
  {
    index: "03",
    category: "Gastro Pub",
    title: "Hamburg\nXL",
    year: "2023",
    placeholderFrom: "#08060E",
    placeholderTo:   "#100D1C",
    lightA: "rgba(120,80,220,0.08)",
    lightB: "rgba(200,255,0,0.02)",
    fileName: "hamburg-xl.jpg",
  },
  {
    index: "04",
    category: "Music & Entertainment",
    title: "Deniz\nGül",
    year: "2025",
    placeholderFrom: "#0E0806",
    placeholderTo:   "#1A0C08",
    lightA: "rgba(220,80,40,0.07)",
    lightB: "rgba(200,255,0,0.02)",
    fileName: "deniz-gul.jpg",
  },
] as const;

type Project = (typeof projects)[number];

/* ─────────────────────────────────────────────────────────────
   TILE ANIMATION VARIANTS
   All four tiles stagger in from one shared parent observer.
───────────────────────────────────────────────────────────── */
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CINEMATIC },
  },
};

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER
   Rich atmospheric gradient. Swap the inner div for
   <Image fill … /> or <video autoPlay muted loop playsInline … />
   when real assets are ready.
───────────────────────────────────────────────────────────── */
function Placeholder({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${project.placeholderFrom} 0%, ${project.placeholderTo} 100%)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 55% at 28% 38%, ${project.lightA} 0%, transparent 70%),
            radial-gradient(ellipse 45% 55% at 72% 68%, ${project.lightB} 0%, transparent 60%)
          `,
        }}
      />
      <span
        className="absolute bottom-3 right-4 font-label text-[0.45rem] tracking-[0.2em] uppercase text-white/15 select-none"
        aria-hidden="true"
      >
        replace → {project.fileName}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT TILE
   Self-contained: placeholder behind, overlay text in front.
   Text lives inside the image — editorial overlay style.

   On mobile:  full-width, aspect-[4/3]
   On lg+:     fills the grid cell (h-full, no aspect ratio)
───────────────────────────────────────────────────────────── */
function ProjectTile({ project }: { project: Project }) {
  return (
    <motion.article
      variants={tileVariants}
      className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden group"
      data-cursor-hover
    >
      {/* Image / video — zooms very slightly on hover */}
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]">
        <Placeholder project={project} />
      </div>

      {/* Gradient — ensures text legibility at top and bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 35%, transparent 55%, rgba(10,10,10,0.75) 100%)",
        }}
      />

      {/* Top row: index left, category right */}
      <div className="absolute top-5 left-5 right-5 z-10 flex items-start justify-between">
        <span className="font-label text-[0.6rem] font-semibold tracking-[0.2em] text-accent">
          {project.index}
        </span>
        <span className="label text-[0.55rem] text-white/40">
          {project.category}
        </span>
      </div>

      {/* Bottom: title left, year right */}
      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
        <h3
          className="
            font-display font-semibold tracking-[-0.02em] leading-[0.92]
            text-text whitespace-pre-line
            text-[5.5vw] sm:text-[3.5vw] lg:text-[1.65vw]
          "
        >
          {project.title}
        </h3>
        <span className="label text-[0.55rem] text-white/35 shrink-0 pb-0.5">
          {project.year}
        </span>
      </div>

      {/* Hover: "View Project" pill slides up */}
      <div
        className="
          absolute bottom-5 left-1/2 -translate-x-1/2 z-10
          font-label text-[0.55rem] font-semibold tracking-[0.18em] uppercase
          bg-canvas/75 text-text backdrop-blur-sm
          px-4 py-2 rounded-full whitespace-nowrap
          opacity-0 translate-y-3
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
        "
        aria-hidden="true"
      >
        View Project ↗
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORK SECTION

   Desktop grid (lg+):
   ┌────────────────────────┬─────────────────┐  h-[40vh]
   │  01  Commercial  (62%) │  02  Restaurant  │
   │      Production        │  (38%)           │
   ├──────────────┬─────────┴─────────────────┤  3px gap
   │  03  AI (38%)│  04  Music Video  (62%)   │  h-[36vh]
   └──────────────┴───────────────────────────┘

   Row proportions differ (62/38 vs 38/62) to break symmetry.
   Row heights differ (40vh vs 36vh) to create visual rhythm.

   Mobile: stacked 2×2, each tile aspect-[4/3].
───────────────────────────────────────────────────────────── */
export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  return (
    <section
      ref={ref}
      id="work"
      className="relative bg-canvas px-6 pt-20 pb-20 md:px-10 md:pt-24 md:pb-24 lg:px-16"
      aria-label="Selected Work"
    >
      {/* ── COMPACT HEADER ──────────────────────────────────── */}
      <div className="mb-8 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
        >
          <p className="label text-text-muted mb-1">Selected Work</p>
          <h2
            className="
              font-display font-semibold tracking-[-0.02em] leading-none text-text
              text-[5.5vw] sm:text-[4vw] lg:text-[2.2vw]
            "
          >
            Work that earns <span className="text-accent">attention.</span>
          </h2>
        </motion.div>

        <motion.span
          className="label text-text-muted hidden sm:block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_CINEMATIC }}
        >
          04 Projects
        </motion.span>
      </div>

      {/* ── PROJECT GRID ────────────────────────────────────── */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-col gap-[3px]"
      >
        {/* Row 1: 62 / 38 */}
        <div className="grid grid-cols-1 sm:grid-cols-[62fr_38fr] gap-[3px] lg:h-[40vh]">
          <ProjectTile project={projects[0]} />
          <ProjectTile project={projects[1]} />
        </div>

        {/* Row 2: 38 / 62  — reversed proportion for rhythm */}
        <div className="grid grid-cols-1 sm:grid-cols-[38fr_62fr] gap-[3px] lg:h-[36vh]">
          <ProjectTile project={projects[2]} />
          <ProjectTile project={projects[3]} />
        </div>
      </motion.div>
    </section>
  );
}
