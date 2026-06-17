"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   CUSTOM CURSOR
   Two-layer cursor: a tight dot (instant) + a larger ring that
   follows with a spring delay (premium feel).

   Only mounted on pointer:fine devices (mouse/trackpad).
   Hidden during SSR — avoids hydration mismatch.
───────────────────────────────────────────────────────────── */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);

  /* Raw mouse position — updates instantly */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Ring follows with a spring (tuned for premium lag feel) */
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    /* Only activate on pointer:fine (no mobile) */
    const mq = window.matchMedia("(pointer: fine)");
    setHasPointer(mq.matches);
    setMounted(true);

    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    /* Scale the ring when hovering any interactive element */
    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, label, [data-cursor-hover]")
      ) {
        setIsHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, label, [data-cursor-hover]")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY]);

  /* Don't render during SSR or on touch devices */
  if (!mounted || !hasPointer) return null;

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-accent"
        style={{
          width: 6,
          height: 6,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — follows with spring, scales on hover */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border border-accent/60"
        style={{
          width: 36,
          height: 36,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering
            ? "rgba(200, 255, 0, 1)"
            : "rgba(200, 255, 0, 0.6)",
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
