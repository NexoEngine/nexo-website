import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DownloadButton from './DownloadButton';
import { Headset, Monitor, Gamepad } from 'lucide-react';
import VRHeadset from './VRHeadset';
import Aurora from './Aurora';

const AnimatedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const vrHeadsetRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current || !vrHeadsetRef.current) return;

    // Initial VR headset animation
    gsap.fromTo(vrHeadsetRef.current, {
      opacity: 0,
      scale: 0.8,
      rotationY: -45,
    }, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Floating animation for VR headset
    gsap.to(vrHeadsetRef.current, {
      y: '10px',
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!vrHeadsetRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xRotation = ((clientY / innerHeight) - 0.5) * 20;
      const yRotation = ((clientX / innerWidth) - 0.5) * 20;
      
      gsap.to(vrHeadsetRef.current, {
        rotationX: -xRotation,
        rotationY: yRotation,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-nexo-black py-16 sm:py-24">
      <div className="absolute inset-0">
        <Aurora
          colorStops={["#2f0e52", "#bd35cb", "#03b4d1"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      <div className="nexo-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-5">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="vr-highlight px-4 py-2 inline-flex items-center">
                  <Headset className="mr-2 h-5 w-5 text-nexo-blue" />
                  <span className="text-nexo-blue font-semibold">VR First Development</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight chrome-gradient-text">
                NEXO VR Game Engine
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                The next generation open-source game engine built specifically for VR headset developers.
                Create immersive experiences with speed and simplicity, directly from your VR headset.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <DownloadButton showAllReleases={true} variant="chrome" />
            </div>
            
            <div className="chrome-surface rounded-lg p-4">
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center">
                  <Headset className="mr-2 h-5 w-5 text-nexo-blue" />
                  <span className="text-sm text-nexo-chrome">VR-First Development</span>
                </div>
                <div className="flex items-center">
                  <Monitor className="mr-2 h-5 w-5 text-nexo-blue" />
                  <span className="text-sm text-nexo-chrome">Cross-Platform</span>
                </div>
                <div className="flex items-center">
                  <Gamepad className="mr-2 h-5 w-5 text-nexo-blue" />
                  <span className="text-sm text-nexo-chrome">3D/VR Templates</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -right-16 -top-16 w-44 h-44 bg-nexo-magenta/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -left-16 -bottom-16 w-44 h-44 bg-nexo-teal/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div ref={vrHeadsetRef} className="relative w-full max-w-lg transform-gpu">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-nexo-blue/30 to-nexo-chrome/20 opacity-75 blur-xl"></div>
              <div className="relative chrome-card">
                <div className="absolute -right-5 -top-5 chrome-border bg-nexo-darkBlue/90 p-2 rounded-lg z-10">
                  <Headset className="h-8 w-8 text-nexo-blue" />
                </div>
                <VRHeadset />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;