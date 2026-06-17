/* ─────────────────────────────────────────────────────────────
   GRAIN OVERLAY
   Fixed full-screen overlay that adds a subtle film-grain texture.

   Implementation: an SVG feTurbulence filter generates noise;
   a large pseudo-tile shifts position on each keyframe step
   (defined in globals.css) to simulate the flickering of film grain.

   Performance: GPU-composited via `will-change: transform`.
   The SVG filter is rendered once and cached by the browser.
───────────────────────────────────────────────────────────── */
export default function GrainOverlay() {
  return (
    <>
      {/* The SVG filter definition — invisible, zero size */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* The animated overlay tile */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9000] overflow-hidden"
        style={{ opacity: 0.035 }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-200%",
            width: "400%",
            height: "400%",
            filter: "url(#grain-filter)",
            animation: "grain 8s steps(10, end) infinite",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}
