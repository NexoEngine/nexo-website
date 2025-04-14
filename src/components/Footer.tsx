
import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerNavigation = {
    engine: [
      { name: 'Features', href: '#features' },
      { name: 'Documentation', href: 'https://github.com/NexoEngine/game-engine/wiki' },
      { name: 'Releases', href: 'https://github.com/NexoEngine/game-engine/releases' },
    ],
    community: [
      { name: 'GitHub', href: 'https://github.com/NexoEngine' },
      { name: 'Discussions', href: 'https://github.com/NexoEngine/game-engine/discussions' },
      { name: 'Issues', href: 'https://github.com/NexoEngine/game-engine/issues' },
    ],
    legal: [
      { name: 'License', href: 'https://github.com/NexoEngine/game-engine/blob/main/LICENSE' },
      { name: 'Contributing', href: 'https://github.com/NexoEngine/game-engine/blob/main/CONTRIBUTING.md' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/NexoEngine', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter }, // Replace with actual Twitter URL when available
  ];

  return (
    <footer className="bg-nexo-black border-t border-nexo-darkBlue" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="nexo-container py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="https://raw.githubusercontent.com/NexoEngine/assets/main/Logo/LogoColor.png"
                alt="NEXO Logo"
              />
              <span className="ml-3 text-xl font-bold">NEXO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The next generation open-source game engine for modern developers, built with performance and simplicity in mind.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-nexo-blue"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Engine</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.engine.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-nexo-blue"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Community</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.community.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-nexo-blue"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-4 space-y-2">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-nexo-blue"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-nexo-darkBlue flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {currentYear} NEXO Engine. All rights reserved. MIT License.
          </p>
          {/* <p className="text-xs text-muted-foreground mt-2 md:mt-0 flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by the open-source community
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
