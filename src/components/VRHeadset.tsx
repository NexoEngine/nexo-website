import React from 'react';
const VRHeadset = () => {
  return <div className="w-full h-[400px] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-nexo-blue/10 via-transparent to-transparent opacity-0" />
      
      {/* VR Headset Image */}
      <img src="https://atlas-content-cdn.pixelsquid.com/assets_v2/290/2901700996352710175/jpeg-600/G03.jpg?modifiedAt=1" alt="VR Headset" className="relative z-10 drop-shadow-lg w-auto h-[280px] object-contain" />

      {/* Overlay gradient at bottom */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent to-nexo-darkBlue/30" />
      
      {/* VR label */}
      <div className="absolute left-4 bottom-4 vr-highlight px-3 py-1 text-sm bg-nexo-black/80 backdrop-blur-sm">
        <span className="text-nexo-blue font-medium">Design & Develop in VR</span>
      </div>
    </div>;
};
export default VRHeadset;