import React from 'react';
import DownloadButton from './DownloadButton';
import { Headset, Monitor, Gamepad } from 'lucide-react';
import VRHeadset from './VRHeadset';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-nexo-black bg-chrome-radial py-16 sm:py-24 bg-[size:20px_20px] bg-chrome-grid">
      <div className="absolute inset-0 bg-gradient-radial from-nexo-blue/10 via-transparent to-transparent" />
      
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
            <div className="absolute -right-16 -top-16 w-44 h-44 bg-nexo-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-16 -bottom-16 w-44 h-44 bg-nexo-blue/10 rounded-full blur-3xl"></div>
            
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-nexo-blue/30 to-nexo-chrome/20 opacity-75 blur-xl"></div>
              <div className="relative chrome-card">
                <div className="absolute -right-5 -top-5 chrome-border bg-nexo-darkBlue/90 p-2 rounded-lg z-10 animate-float">
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

export default Hero;
