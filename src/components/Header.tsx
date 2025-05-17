import React, { useState } from 'react';
import { Menu, X, Github, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signInWithGoogle, signOut, loading } = useAuth();
  
  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Blog', href: '/blog', isLink: true },
    { name: 'Documentation', href: 'https://github.com/NexoEngine/game-engine/wiki' },
    { name: 'Community', href: 'https://github.com/NexoEngine/game-engine/discussions' },
    { name: 'GitHub', href: 'https://github.com/NexoEngine/game-engine', icon: Github },
  ];

  if (isAdmin) {
    navigation.push({ name: 'Admin', href: '/admin', isLink: true });
  }

  const getInitials = (name: string | null | undefined): string => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

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
        
        {/* Desktop navigation & Auth */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => {
            const commonProps = {
              key: item.name,
              className: cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-nexo-blue",
                item.icon ? "inline-flex items-center gap-1" : ""
              ),
              target: item.href.startsWith('http') ? '_blank' : undefined,
              rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
            };

            return item.isLink ? (
              <Link to={item.href} {...commonProps}>
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ) : (
              <a href={item.href} {...commonProps}>
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </a>
            );
          })}

          {/* Auth Section */}
          {!loading && (
            <div className="ml-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" onClick={signOut} className="nexo-btn-outline">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={signInWithGoogle} className="nexo-btn-outline">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button & Auth placeholder (adapt if needed) */}
        <div className="flex items-center md:hidden">
          {/* Add mobile auth button if needed */} 
          <button
            type="button"
            className="nexo-btn-outline p-2 ml-4"
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
          <div className="flex flex-col space-y-4 px-4 pt-2 pb-3 border-t border-nexo-darkBlue/50 bg-nexo-black/95 backdrop-blur-lg">
            {navigation.map((item) => {
              const commonProps = {
                key: item.name,
                className: cn(
                  "flex items-center rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-nexo-blue/10 hover:text-nexo-blue",
                  item.icon ? "gap-2" : ""
                ),
                onClick: () => setMobileMenuOpen(false),
                target: item.href.startsWith('http') ? '_blank' : undefined,
                rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
              };

              return item.isLink ? (
                <Link to={item.href} {...commonProps}>
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                </Link>
              ) : (
                <a href={item.href} {...commonProps}>
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                </a>
              );
            })}

            {/* Mobile Auth Section */} 
            <div className="border-t border-nexo-darkBlue/50 pt-4">
              {!loading && (
                user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-white">{user.displayName || 'User'}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-muted-foreground hover:text-nexo-blue">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full nexo-btn-outline" onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }}>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In with Google
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
