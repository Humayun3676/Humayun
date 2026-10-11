import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const CustomCursor = () => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const reqId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Strictly disable on touch devices / coarse pointers / reduced motion
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select, .interactive-target')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // RAF loop for smooth lag / lerp on the outer ring
    const render = () => {
      // Lerp ring towards cursor position
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      reqId.current = requestAnimationFrame(render);
    };

    reqId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, [reducedMotion, isVisible]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-primary transition-opacity duration-200 ${
          isVisible ? 'opacity-90' : 'opacity-0'
        } ${isHoveringInteractive ? 'scale-150 bg-blue-500' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-primary/40 dark:border-blue-400/50 bg-primary/5 transition-[width,height,opacity,background-color] duration-200 ${
          isVisible ? 'opacity-80' : 'opacity-0'
        } ${
          isHoveringInteractive
            ? 'w-12 h-12 bg-primary/10 border-primary/70'
            : 'w-8 h-8'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
