
import React from 'react';
import { Layers, Zap, Code, Gamepad2, Palette, Globe } from 'lucide-react';

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

const Features = () => {
  return (
    <div id="features" className="bg-nexo-darkBlue py-16 sm:py-24">
      <div className="nexo-container">
        <div className="text-center mx-auto max-w-2xl mb-16">
          <h2 className="text-3xl font-bold tracking-tight nexo-gradient-text sm:text-4xl">
            Powerful capabilities, simple workflow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to build your next game, with the workflow you'll love.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="nexo-card group">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-nexo-blue/10 group-hover:bg-nexo-blue/20 transition-colors">
                <feature.icon className="h-6 w-6 text-nexo-blue" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
              <p className="mt-2 text-base text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="https://github.com/NexoEngine/game-engine/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="nexo-btn-outline py-2 px-4"
          >
            Explore Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
