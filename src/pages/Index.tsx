
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { Headset, Gamepad, Monitor, Video, Chrome } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />

        <section className="py-16 sm:py-24 bg-chrome-radial bg-chrome-grid bg-[size:20px_20px]">
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
                  <div className="chrome-card flex flex-col items-center text-center p-6 space-y-4">
                    <div className="p-3 rounded-full bg-nexo-blue/20 text-nexo-blue">
                      <Headset className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-nexo-chrome">VR-First Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Built from the ground up for VR headset developers, with intuitive in-headset controls.
                    </p>
                  </div>

                  <div className="chrome-card flex flex-col items-center text-center p-6 space-y-4">
                    <div className="p-3 rounded-full bg-nexo-blue/20 text-nexo-blue">
                      <Gamepad className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-nexo-chrome">VR Templates</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with pre-built VR interaction templates optimized for different headsets.
                    </p>
                  </div>

                  <div className="chrome-card flex flex-col items-center text-center p-6 space-y-4">
                    <div className="p-3 rounded-full bg-nexo-blue/20 text-nexo-blue">
                      <Chrome className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-nexo-chrome">Zaza zozo</h3>
                    <p className="text-sm text-muted-foreground">
                      Skibidi zaza zozo. Skibidi zaza zozo. Skibidi zaza zozo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-nexo-black bg-hero-pattern">
          <div className="nexo-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight chrome-gradient-text sm:text-4xl">
                Ready to build VR games with NEXO?
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Join our growing community of VR developers creating the next generation of immersive experiences.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6 flex-col sm:flex-row">
                <a
                  href="https://github.com/NexoEngine/game-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chrome-btn px-4 py-2"
                >
                  Star on GitHub
                </a>
                <a
                  href="https://github.com/NexoEngine/game-engine/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nexo-btn-outline px-4 py-2"
                >
                  Join the VR Community
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
