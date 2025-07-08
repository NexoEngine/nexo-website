
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeader from '@/components/AnimatedHeader';
import AnimatedHero from '@/components/AnimatedHero';
import AnimatedFeatures from '@/components/AnimatedFeatures';
import Footer from '@/components/Footer';
import { Headset, Gamepad, Monitor, Video, Chrome } from 'lucide-react';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PageTransition } from '@/components/animations/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const vrSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (vrSectionRef.current) {
      const cards = vrSectionRef.current.querySelectorAll('.vr-card');
      
      gsap.fromTo(cards, {
        opacity: 0,
        y: 50,
        rotateY: -30,
      }, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: vrSectionRef.current,
          start: 'top 80%',
          once: true,
        }
      });
    }

    if (ctaSectionRef.current) {
      gsap.fromTo(ctaSectionRef.current.querySelector('h2'), {
        opacity: 0,
        scale: 0.8,
      }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 80%',
          once: true,
        }
      });
    }
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-nexo-black text-white">
        <AnimatedHeader />
        <main className="flex-grow">
          <AnimatedHero />
          <AnimatedFeatures />

        <section ref={vrSectionRef} className="py-16 sm:py-24 bg-chrome-radial bg-chrome-grid bg-[size:20px_20px]">
          <div className="nexo-container">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col items-center space-y-8">
                <div className="vr-highlight px-4 py-2">
                  <Headset className="h-6 w-6 text-nexo-blue" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight chrome-gradient-text sm:text-4xl text-center">
                  Develop VR Games From Inside VR
                </h2>

                <p className="text-lg leading-8 text-muted-foreground text-center">
                  NEXO is the first game engine designed specifically for VR developers who want to create
                  directly from their headsets. No more switching between desktop and VR view.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                  <div className="vr-card chrome-card flex flex-col items-center text-center p-6 space-y-4">
                    <div className="p-3 rounded-full bg-nexo-blue/20 text-nexo-blue">
                      <Headset className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-nexo-chrome">VR-First Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Built from the ground up for VR headset developers, with intuitive in-headset controls.
                    </p>
                  </div>

                  <div className="vr-card chrome-card flex flex-col items-center text-center p-6 space-y-4">
                    <div className="p-3 rounded-full bg-nexo-blue/20 text-nexo-blue">
                      <Gamepad className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-nexo-chrome">VR Templates</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with pre-built VR interaction templates optimized for different headsets.
                    </p>
                  </div>

                  <div className="vr-card chrome-card flex flex-col items-center text-center p-6 space-y-4">
                    <div className="p-3 rounded-full bg-nexo-blue/20 text-nexo-blue">
                      <Chrome className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-nexo-chrome">Optimized Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Built for speed with multi-threaded rendering, efficient memory management, and native VR optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={ctaSectionRef} className="py-16 sm:py-24 bg-nexo-black bg-hero-pattern">
          <div className="nexo-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight chrome-gradient-text sm:text-4xl">
                Ready to build VR games with NEXO?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Join our growing community of VR developers creating the next generation of immersive experiences.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6 flex-col sm:flex-row">
                <AnimatedButton variant="default" size="lg" magneticStrength={0.4}>
                  <a
                    href="https://github.com/NexoEngine/game-engine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Star on GitHub
                  </a>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" magneticStrength={0.4}>
                  <a
                    href="https://github.com/NexoEngine/game-engine/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the VR Community
                  </a>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Index;
