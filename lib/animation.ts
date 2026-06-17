import type { BezierDefinition } from "motion-utils";

/* ─────────────────────────────────────────────────────────────
   SHARED ANIMATION CONSTANTS
   BezierDefinition requires `readonly [n, n, n, n]` — `as const`
   satisfies that constraint without a manual cast.
───────────────────────────────────────────────────────────── */

/* Cinematic — controlled, deliberate. Used for hero text reveals. */
export const EASE_CINEMATIC: BezierDefinition = [0.76, 0, 0.24, 1] as const;

/* Expo-out — snappy entrance, used for UI elements. */
export const EASE_OUT_EXPO: BezierDefinition = [0.19, 1, 0.22, 1] as const;
