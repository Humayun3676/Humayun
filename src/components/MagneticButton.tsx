import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({ children, className = '', strength = 0.25 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: !reducedMotion ? `translate3d(${offset.x}px, ${offset.y}px, 0)` : 'none',
        transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 0.1s ease-out'
      }}
      className={`inline-block active:scale-[0.98] transition-transform ${className}`}
    >
      {children}
    </div>
  );
};
