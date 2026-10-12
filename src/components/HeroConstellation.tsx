import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const HeroConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Turn off for reduced motion or coarse pointers (touch/mobile devices)
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (reducedMotion || isCoarse) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);

    let animationFrameId: number;
    let resizeCleanup: (() => void) | undefined;
    let visibilityCleanup: (() => void) | undefined;
    let observerCleanup: (() => void) | undefined;
    let cancelled = false;

    const startCanvas = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
      let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

      const handleResize = () => {
        if (!canvas || !canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      };

      window.addEventListener('resize', handleResize, { passive: true });
      resizeCleanup = () => window.removeEventListener('resize', handleResize);

      // Node count capped at 42 for optimal performance
      const nodeCount = 42;
      const nodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1
        });
      }

      let isVisible = true;
      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      });
      observer.observe(canvas);
      observerCleanup = () => observer.disconnect();

      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      visibilityCleanup = () => document.removeEventListener('visibilitychange', handleVisibilityChange);

      const render = () => {
        if (!isVisible) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }

        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.classList.contains('dark');
        const nodeColor = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.25)';
        const lineColor = isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(37, 99, 235, 0.08)';

        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    // Defer start until after initial paint via requestIdleCallback
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if ('requestIdleCallback' in window) {
      idleId = (window as Window).requestIdleCallback(startCanvas, { timeout: 1000 });
    } else {
      timerId = setTimeout(startCanvas, 300);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        (window as Window).cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      if (resizeCleanup) resizeCleanup();
      if (visibilityCleanup) visibilityCleanup();
      if (observerCleanup) observerCleanup();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (!shouldRender || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
    />
  );
};
