import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface AnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number | object;
  scrollTrigger?: {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    toggleActions?: string;
    once?: boolean;
  };
}

export const useGsapAnimation = <T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, ctx: gsap.Context) => void,
  dependencies: React.DependencyList = []
) => {
  const ref = useRef<T>(null);
  const ctx = useRef<gsap.Context>();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      return;
    }

    ctx.current = gsap.context((self) => {
      if (ref.current) {
        animation(ref.current, self);
      }
    }, ref);

    return () => ctx.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return ref;
};

export const useFadeIn = (options: AnimationOptions = {}) => {
  return useGsapAnimation((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'power2.out',
        delay: options.delay || 0,
        scrollTrigger: options.scrollTrigger,
      }
    );
  });
};

export const useStaggerChildren = (
  selector: string,
  options: AnimationOptions = {}
) => {
  return useGsapAnimation((element) => {
    const children = element.querySelectorAll(selector);
    
    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.6,
        ease: options.ease || 'power2.out',
        stagger: options.stagger || 0.1,
        scrollTrigger: options.scrollTrigger
          ? {
              trigger: element,
              start: 'top 80%',
              ...options.scrollTrigger,
            }
          : undefined,
      }
    );
  });
};

export const useParallax = (speed: number = 0.5, options: AnimationOptions = {}) => {
  return useGsapAnimation((element) => {
    gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...options.scrollTrigger,
      },
    });
  });
};

export const useTextReveal = (options: AnimationOptions = {}) => {
  return useGsapAnimation((element) => {
    const words = element.textContent?.split(' ') || [];
    element.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(' ');

    const spans = element.querySelectorAll('span span');
    
    gsap.fromTo(
      spans,
      { y: '100%' },
      {
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'power3.out',
        stagger: options.stagger || 0.02,
        scrollTrigger: options.scrollTrigger,
      }
    );
  });
};

export const useScaleIn = (options: AnimationOptions = {}) => {
  return useGsapAnimation((element) => {
    gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: options.duration || 0.6,
        ease: options.ease || 'back.out(1.7)',
        scrollTrigger: options.scrollTrigger,
      }
    );
  });
};

export const useRotateIn = (options: AnimationOptions = {}) => {
  return useGsapAnimation((element) => {
    gsap.fromTo(
      element,
      { rotationY: 90, opacity: 0 },
      {
        rotationY: 0,
        opacity: 1,
        duration: options.duration || 0.8,
        ease: options.ease || 'power3.out',
        scrollTrigger: options.scrollTrigger,
      }
    );
  });
};