import React, { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  magneticStrength?: number;
  ripple?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  magneticStrength = 0.3,
  ripple = true,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!buttonRef.current || !magneticRef.current) return;

    const button = buttonRef.current;
    const magnetic = magneticRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnetic.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = (e.clientX - centerX) * magneticStrength;
      const distanceY = (e.clientY - centerY) * magneticStrength;

      gsap.to(button, {
        x: distanceX,
        y: distanceY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    magnetic.addEventListener('mousemove', handleMouseMove);
    magnetic.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magnetic.removeEventListener('mousemove', handleMouseMove);
      magnetic.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticStrength]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rippleEl = document.createElement('span');
      rippleEl.className = 'absolute rounded-full bg-white/30 pointer-events-none';
      rippleEl.style.left = `${x}px`;
      rippleEl.style.top = `${y}px`;
      rippleEl.style.transform = 'translate(-50%, -50%)';
      
      buttonRef.current.appendChild(rippleEl);

      gsap.fromTo(
        rippleEl,
        {
          width: 0,
          height: 0,
          opacity: 1,
        },
        {
          width: Math.max(rect.width, rect.height) * 2,
          height: Math.max(rect.width, rect.height) * 2,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => rippleEl.remove(),
        }
      );
    }

    props.onClick?.(e);
  };

  return (
    <div ref={magneticRef} className="inline-block p-4">
      <Button
        ref={buttonRef}
        className={cn('relative overflow-hidden', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};