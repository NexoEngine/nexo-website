import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Zap, Code, Gamepad2, Palette, Globe } from 'lucide-react';
import { AnimatedButton } from './animations/AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    name: 'Modern Architecture',
    description: 'Built with a data-oriented design approach for maximum performance across all platforms.',
    icon: Layers,
  },
  {
    name: 'High Performance',
    description: 'Optimized rendering pipeline designed to handle complex scenes with minimal overhead.',
    icon: Zap,
  },
  {
    name: 'Developer Friendly',
    description: 'Intuitive API with comprehensive documentation to accelerate your development workflow.',
    icon: Code,
  },
  {
    name: 'Game-Ready Components',
    description: 'Physics, audio, input, networking, and AI systems built-in and ready to use.',
    icon: Gamepad2,
  },
  {
    name: 'Powerful Editor',
    description: 'Customizable editor with real-time feedback for rapid iteration and content creation.',
    icon: Palette,
  },
  {
    name: 'Cross-Platform',
    description: 'Deploy to multiple platforms including Windows, macOS, Linux, consoles, and mobile devices.',
    icon: Globe,
  },
];

const AnimatedFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    )
    .fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationX: -20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      cards.forEach((card, index) => {
        const icon = card.querySelector('.feature-icon');
        const iconBg = card.querySelector('.feature-icon-bg');
        
        gsap.to(icon, {
          rotation: 360,
          duration: 20 + index * 2,
          ease: 'none',
          repeat: -1,
        });

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
          });
          
          gsap.to(iconBg, {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
          
          gsap.to(iconBg, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }

    const parallaxElements = containerRef.current.querySelectorAll('.parallax-element');
    parallaxElements.forEach((el, index) => {
      gsap.to(el, {
        y: -50 * (index + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} id="features" className="nexo-section-gradient-1 py-16 sm:py-24 relative overflow-hidden border-t-2 border-white/20">
      <div className="absolute inset-0 bg-gradient-to-b from-nexo-blue/5 to-transparent parallax-element" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-nexo-blue/10 rounded-full blur-3xl parallax-element" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-nexo-blue/10 rounded-full blur-3xl parallax-element" />
      
      <div className="nexo-container relative">
        <div className="text-center mx-auto max-w-2xl mb-16">
          <h2 ref={titleRef} className="text-3xl font-bold tracking-tight nexo-gradient-text sm:text-4xl">
            Powerful capabilities, simple workflow
          </h2>
          <p ref={subtitleRef} className="mt-4 text-lg text-muted-foreground">
            Everything you need to build your next game, with the workflow you'll love.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="feature-card nexo-card-glass group cursor-pointer transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative mb-4">
                <div className="feature-icon-bg absolute inset-0 flex h-10 w-10 items-center justify-center rounded-lg bg-nexo-blue/10 group-hover:bg-nexo-blue/20 transition-colors" />
                <div className="feature-icon relative flex h-10 w-10 items-center justify-center">
                  <feature.icon className="h-6 w-6 text-nexo-blue" aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
              <p className="mt-2 text-base text-muted-foreground">
                {feature.description}
              </p>
              {index === 0 && (
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-nexo-blue/20 rounded text-xs text-nexo-blue">
                  New
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <AnimatedButton variant="outline" size="lg" magneticStrength={0.3}>
            <a
              href="https://github.com/NexoEngine/game-engine/wiki"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Documentation
            </a>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFeatures;