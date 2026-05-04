import { useEffect, useRef } from "react";

/**
 * Full-bleed auth backdrop:
 *  1. A deep "universe" gradient layer — dark purple base with lightly visible
 *     purple, blue, turquoise/green nebulae (radial gradients sourced from the
 *     design tokens `--primary`, `--info`, `--success` and the dark
 *     `--background`).
 *  2. A starfield canvas with two tiers of particles:
 *       - an evenly distributed layer of brighter "near" stars
 *       - many smaller "far" stars sampled around random cluster centers
 *         (Gaussian offsets) so the field looks like real galactic clusters
 *         rather than uniform noise.
 *
 * All stars twinkle (per-particle phase + speed + depth) and are pushed away
 * from the cursor with a quadratic falloff inside `repelRadius`. Particles
 * spring back to their seed position. Motion respects
 * `prefers-reduced-motion`.
 *
 * Particle color is bound to `--primary-foreground` so the dots stay light in
 * both light and dark themes.
 */
type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  twinkleDepth: number;
};

type AuthBackdropProps = {
  /** Approx count of evenly distributed "near" stars per 10,000 px². */
  density?: number;
  /** Number of cluster centers (scales gently with viewport area). */
  clusterCount?: number;
  /** Average tiny stars per cluster (each cluster picks 0.5x–1.5x of this). */
  starsPerCluster?: number;
  /** Distance (CSS px) at which the cursor pushes particles. */
  repelRadius?: number;
  /** Strength multiplier of the cursor push. */
  repelStrength?: number;
};

/** Standard normal sample via Box-Muller. */
function gaussian(): number {
  const u = Math.max(Math.random(), 1e-9);
  const v = Math.max(Math.random(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function AuthBackdrop({
  density = 3.3,
  clusterCount = 14,
  starsPerCluster = 38,
  repelRadius = 160,
  repelStrength = 0.6,
}: AuthBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const readParticleColor = (alpha: number) => {
      const styles = getComputedStyle(canvas);
      const fg = styles.getPropertyValue("--primary-foreground").trim();
      if (fg) return `oklch(${fg} / ${alpha})`;
      return `rgba(255, 255, 255, ${alpha})`;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seedParticles = () => {
      const arr: Particle[] = [];

      // Tier 1 — evenly distributed brighter stars.
      const uniformCount = Math.max(120, Math.round((width * height * density) / 10000));
      for (let i = 0; i < uniformCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        arr.push({
          baseX: x,
          baseY: y,
          x,
          y,
          vx: 0,
          vy: 0,
          size: 0.55 + Math.random() * 1.0,
          alpha: 0.28 + Math.random() * 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: reduceMotion ? 0 : 0.008 + Math.random() * 0.022,
          twinkleDepth: 0.1 + Math.random() * 0.25,
        });
      }

      // Tier 2 — cluster stars: many tiny, twinkly pinpoints concentrated
      // around random centers (Gaussian spread). Cluster count scales gently
      // with viewport area so dense screens still get plenty of clusters.
      const referenceArea = 1280 * 720;
      const scaledClusters = Math.max(
        6,
        Math.round(clusterCount * Math.sqrt((width * height) / referenceArea)),
      );
      for (let c = 0; c < scaledClusters; c++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const sigma = 50 + Math.random() * 120;
        const count = Math.round(starsPerCluster * (0.5 + Math.random()));
        for (let i = 0; i < count; i++) {
          const x = Math.max(0, Math.min(width, cx + gaussian() * sigma));
          const y = Math.max(0, Math.min(height, cy + gaussian() * sigma));
          arr.push({
            baseX: x,
            baseY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            size: 0.18 + Math.random() * 0.4,
            alpha: 0.14 + Math.random() * 0.45,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: reduceMotion ? 0 : 0.012 + Math.random() * 0.045,
            twinkleDepth: 0.25 + Math.random() * 0.45,
          });
        }
      }

      particles = arr;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const deactivatePointer = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const radiusSq = repelRadius * repelRadius;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        if (!reduceMotion && pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / repelRadius;
            const force = falloff * falloff * repelStrength;
            p.vx += (dx / dist) * force * 6;
            p.vy += (dy / dist) * force * 6;
          }
        }

        const springX = (p.baseX - p.x) * 0.045;
        const springY = (p.baseY - p.y) * 0.045;
        p.vx = (p.vx + springX) * 0.84;
        p.vy = (p.vy + springY) * 0.84;
        p.x += p.vx;
        p.y += p.vy;

        p.twinklePhase += p.twinkleSpeed;
        const twinkle = 1 + Math.sin(p.twinklePhase) * p.twinkleDepth;
        const speed = Math.min(1, Math.hypot(p.vx, p.vy) * 0.35);
        const alpha = Math.min(0.95, p.alpha * twinkle + speed * 0.4);

        ctx.fillStyle = readParticleColor(alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + speed * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", deactivatePointer);
    window.addEventListener("blur", deactivatePointer);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", deactivatePointer);
      window.removeEventListener("blur", deactivatePointer);
    };
  }, [density, clusterCount, starsPerCluster, repelRadius, repelStrength]);

  // Cosmic gradient stack — uses only design tokens via `oklch(var(--token))`.
  // Tailwind 3 has no native multi-radial-gradient utility; expressing the
  // nebula effect requires a single inline `background`. The colors and the
  // dark base remain bound to design tokens so the layer follows theme.
  const cosmicBackground = [
    "radial-gradient(120% 80% at 18% 12%, oklch(var(--primary) / 0.55), transparent 60%)",
    "radial-gradient(95% 70% at 82% 24%, oklch(var(--info) / 0.32), transparent 65%)",
    "radial-gradient(75% 65% at 72% 60%, oklch(var(--success) / 0.18), transparent 72%)",
    "radial-gradient(70% 55% at 28% 88%, oklch(var(--primary) / 0.40), transparent 70%)",
    "radial-gradient(60% 50% at 90% 92%, oklch(var(--info) / 0.22), transparent 70%)",
    "radial-gradient(140% 100% at 50% 50%, oklch(0.16 0.04 295), oklch(0.10 0.03 295))",
  ].join(", ");

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: cosmicBackground }} />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
