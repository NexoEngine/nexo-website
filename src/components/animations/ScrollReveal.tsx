import React, { ReactNode } from 'react';
import { useFadeIn, AnimationOptions } from '@/hooks/useGsapAnimation';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 0.8,
  once = true,
}) => {
  const animationOptions: AnimationOptions = {
    duration,
    delay,
    scrollTrigger: {
      start: 'top 80%',
      once,
    },
  };

  const ref = useFadeIn(animationOptions);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};