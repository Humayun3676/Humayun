import { useRef, useState, useCallback, type MouseEvent, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  isFeatured?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
}

export const InteractiveCard = ({
  children,
  className = '',
  isFeatured = false,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  'aria-label': ariaLabel
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cardRef.current.style.setProperty('--mx', `${x}px`);
      cardRef.current.style.setProperty('--my', `${y}px`);

      // 3D tilt calculation - gentle max 4.5 degrees
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = Math.max(-5, Math.min(5, ((y - centerY) / centerY) * -4.5));
      const rotateY = Math.max(-5, Math.min(5, ((x - centerX) / centerX) * 4.5));

      setTilt({ rotateX, rotateY });
    },
    [reducedMotion]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mx', '-9999px');
      cardRef.current.style.setProperty('--my', '-9999px');
    }
  };

  const transformStyle =
    !reducedMotion && isHovered
      ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(4px)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className={`relative rounded-2xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/70 shadow-soft hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-950/20 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 overflow-hidden group ${
        isFeatured ? 'ring-2 ring-primary/80 ring-offset-2 ring-offset-[#EFEFEF] dark:ring-offset-slate-900' : ''
      } ${className}`}
    >
      {/* Featured Shimmer Accent Sweep */}
      {isFeatured && (
        <div className="absolute inset-0 pointer-events-none animate-shimmer opacity-40 dark:opacity-60 z-0" />
      )}

      {/* Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background:
            'radial-gradient(400px circle at var(--mx, -9999px) var(--my, -9999px), var(--spotlight-color, rgba(37,99,235,0.12)), transparent 65%)'
        }}
      />

      <div className="relative z-20 h-full flex flex-col">{children}</div>
    </div>
  );
};
