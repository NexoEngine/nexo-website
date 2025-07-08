import React, { ReactNode, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  duration = 0.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        transformOrigin: 'top',
        duration: duration / 2,
        ease: 'power4.inOut',
      }
    )
    .fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration / 2,
        ease: 'power2.out',
      },
      '-=0.2'
    );
  });

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-gradient-to-br from-chrome-500 to-chrome-600 z-50 pointer-events-none"
      />
      <div ref={containerRef}>
        {children}
      </div>
    </>
  );
};