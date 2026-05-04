import { useEffect, useRef } from "react";

/**
 * Full-bleed auth backdrop: a noise/particle field that gets pushed away from
 * the cursor, plus the existing scrim overlay. Drop-in replacement for the old
 * `<img>` background used on Login / VerifyEmail / ResetPasswordRequest /
 * GetStarted (mvp setup).
 *
 * The canvas covers the whole parent area (`absolute inset-0`); particles are
 * regenerated on resize so coverage is guaranteed at any viewport size.
 *
 * Colors are sourced from the live `--foreground` design token so the effect
 * follows light/dark theme switches without hardcoded values.
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
  /** Approx particle count per 10,000 px². Bigger = denser noise field. */
  density?: number;
  /** Distance (CSS px) at which the cursor pushes particles. */
  repelRadius?: number;
  /** Strength multiplier of the cursor push. */
  repelStrength?: number;
};

export function AuthBackdrop({
  density = 0.55,
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

    const readForegroundColor = (alpha: number) => {
      const styles = getComputedStyle(canvas);
      const fg = styles.getPropertyValue("--foreground").trim();
      if (fg) return `oklch(${fg} / ${alpha})`;
      return `rgba(255, 255, 255, ${alpha})`;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seedParticles = () => {
      const targetCount = Math.max(40, Math.round((width * height * density) / 10000));
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
          size: 0.6 + Math.random() * 1.1,
          alpha: 0.18 + Math.random() * 0.32,
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
        const alpha = Math.min(0.85, p.alpha + speed * 0.45);
        ctx.fillStyle = readForegroundColor(alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + speed * 1.2, 0, Math.PI * 2);
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

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 backdrop-blur-sm bg-overlay-scrim" />
    </div>
  );
}
