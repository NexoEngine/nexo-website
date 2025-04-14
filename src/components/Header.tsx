
import React, { useState } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Documentation', href: 'https://github.com/NexoEngine/game-engine/wiki' },
    { name: 'Community', href: 'https://github.com/NexoEngine/game-engine/discussions' },
    { name: 'GitHub', href: 'https://github.com/NexoEngine/game-engine', icon: Github }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nexo-darkBlue/50 bg-nexo-black/80 backdrop-blur-lg">
      <nav className="nexo-container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <img 
              src="https://raw.githubusercontent.com/NexoEngine/assets/main/Logo/LogoColor.png" 
              alt="NEXO Logo" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg tracking-tight">NEXO</span>
          </a>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-nexo-blue",
                item.icon ? "inline-flex items-center gap-1" : ""
              )}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="nexo-btn-outline p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6 border-t border-nexo-darkBlue/50 bg-nexo-black/95 backdrop-blur-lg">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center text-base font-medium text-muted-foreground hover:text-nexo-blue",
                  item.icon ? "gap-2" : ""
                )}
                onClick={() => setMobileMenuOpen(false)}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
