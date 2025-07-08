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
        
        // Subtle icon rotation
        gsap.to(icon, {
          rotation: 360,
          duration: 30 + index * 3,
          ease: 'none',
          repeat: -1,
        });

        // Enhanced hover effects with 3D transform
        card.addEventListener('mouseenter', (e) => {
          gsap.to(card, {
            scale: 1.02,
            y: -8,
            rotationX: -5,
            rotationY: 5,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000,
          });
          
          gsap.to(iconBg, {
            scale: 1.15,
            rotation: 15,
            duration: 0.4,
            ease: 'power2.out',
          });
          
          // Add glow effect to card
          gsap.to(card.querySelector('.relative'), {
            boxShadow: '0 20px 40px -15px rgba(8, 139, 216, 0.3)',
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
          
          gsap.to(iconBg, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
          
          gsap.to(card.querySelector('.relative'), {
            boxShadow: 'none',
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        
        // Add mouse move effect for 3D tilt
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
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
    <div ref={containerRef} id="features" className="relative overflow-hidden py-24 sm:py-32">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nexo-violet via-nexo-purple/50 to-nexo-darkBlue" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-nexo-gradient-mesh opacity-20 animate-pulse" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nexo-blue/20 rounded-full blur-3xl animate-float parallax-element" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nexo-teal/20 rounded-full blur-3xl animate-float parallax-element" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nexo-magenta/10 rounded-full blur-3xl parallax-element" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-nexo-blue to-nexo-teal rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-nexo-magenta to-nexo-purple rounded-full opacity-60 animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="nexo-container relative">
        <div className="text-center mx-auto max-w-3xl mb-20">
          <div className="relative inline-block">
            <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-nexo-blue via-nexo-teal to-nexo-magenta opacity-100 blur-lg animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-white via-nexo-blue to-white bg-clip-text text-transparent animate-gradient bg-300% bg-gradient-x">
                  Powerful capabilities
                </span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-nexo-purple via-nexo-magenta to-nexo-teal bg-clip-text text-transparent">
                simple workflow
              </span>
            </h2>
          </div>
          <p ref={subtitleRef} className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to build your next game, with the workflow you'll love.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="feature-card group relative cursor-pointer transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-nexo-blue via-nexo-teal to-nexo-magenta rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-500 group-hover:duration-200" />
              
              {/* Card content */}
              <div className="relative bg-nexo-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 h-full transition-all duration-300 group-hover:border-white/20">
                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-nexo-blue/40 to-nexo-teal/40 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  </div>
                  <div className="feature-icon-bg relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-nexo-blue/20 to-nexo-teal/20 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white relative z-10" aria-hidden="true" />
                  </div>
                </div>
                
                {/* Text content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-nexo-blue transition-colors duration-300">
                  {feature.name}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover glow effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-nexo-blue/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-nexo-blue to-nexo-teal rounded-full text-xs text-white font-medium shadow-lg">
                    New
                  </div>
                )}
              </div>
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