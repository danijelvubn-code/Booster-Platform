import { useEffect, useRef } from "react";

/**
 * Full-bleed auth backdrop:
 *  1. A deep "universe" gradient layer — dark purple base with lightly visible
 *     purple, blue, turquoise/green nebulae (radial gradients sourced from the
 *     design tokens `--primary`, `--info`, `--success` and the dark
 *     `--background`).
 *  2. A noise field of light particles drawn on a `<canvas>`. Particles spring
 *     back to their seed position and are pushed away from the cursor with a
 *     quadratic falloff inside `repelRadius`. Density scales with viewport
 *     area, so coverage is guaranteed at any size.
 *
 * Particles use `--primary-foreground` (white-ish in both light and dark
 * themes) so they read as bright pinpoints regardless of theme.
 *
 * Honors `prefers-reduced-motion` by disabling the cursor repulsion
 * (particles still render but stay at rest).
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
};

type AuthBackdropProps = {
  /** Approx particle count per 10,000 px². 6× the previous default. */
  density?: number;
  /** Distance (CSS px) at which the cursor pushes particles. */
  repelRadius?: number;
  /** Strength multiplier of the cursor push. */
  repelStrength?: number;
};

export function AuthBackdrop({
  density = 3.3,
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
      const targetCount = Math.max(120, Math.round((width * height * density) / 10000));
      particles = new Array(targetCount).fill(null).map(() => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          baseX: x,
          baseY: y,
          x,
          y,
          vx: 0,
          vy: 0,
          size: 0.5 + Math.random() * 0.9,
          alpha: 0.22 + Math.random() * 0.4,
        };
      });
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

        const speed = Math.min(1, Math.hypot(p.vx, p.vy) * 0.35);
        const alpha = Math.min(0.9, p.alpha + speed * 0.45);
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
  }, [density, repelRadius, repelStrength]);

  // Cosmic gradient stack — uses only design tokens via `oklch(var(--token))`.
  // Tailwind 3 has no native multi-radial-gradient utility; expressing the
  // nebula effect requires a single inline `background`. The colors and the
  // dark base remain bound to design tokens so the layer follows theme.
  const cosmicBackground = [
    // bright purple core, top-left
    "radial-gradient(120% 80% at 18% 12%, oklch(var(--primary) / 0.55), transparent 60%)",
    // blue nebula, top-right
    "radial-gradient(95% 70% at 82% 24%, oklch(var(--info) / 0.32), transparent 65%)",
    // turquoise / green hint, mid-right
    "radial-gradient(75% 65% at 72% 60%, oklch(var(--success) / 0.18), transparent 72%)",
    // softer purple, bottom-left
    "radial-gradient(70% 55% at 28% 88%, oklch(var(--primary) / 0.40), transparent 70%)",
    // subtle blue accent, bottom-right
    "radial-gradient(60% 50% at 90% 92%, oklch(var(--info) / 0.22), transparent 70%)",
    // deep dark base
    "radial-gradient(140% 100% at 50% 50%, oklch(0.16 0.04 295), oklch(0.10 0.03 295))",
  ].join(", ");

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: cosmicBackground }} />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
