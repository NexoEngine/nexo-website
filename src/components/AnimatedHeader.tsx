import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Menu, X, Github, LogIn, LogOut, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedButton } from './animations/AnimatedButton';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AnimatedHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
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

  useGSAP(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(logoRef.current, {
      opacity: 0,
      x: -30,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .fromTo(navRef.current?.querySelectorAll('a') || [], {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.3')
    .fromTo(actionsRef.current, {
      opacity: 0,
      x: 30,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const items = mobileMenuRef.current.querySelectorAll('a, button');
      
      gsap.fromTo(mobileMenuRef.current, {
        opacity: 0,
        height: 0,
      }, {
        opacity: 1,
        height: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.fromTo(items, {
        opacity: 0,
        x: -20,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.1,
      });
    }
  }, [mobileMenuOpen]);

  const getInitials = (name?: string | null): string => {
    if (!name) return user?.email?.[0]?.toUpperCase() || 'U';
    const nameParts = name.split(' ');
    if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const displayName = profile?.full_name || profile?.username || user?.email;
  const avatarUrl = profile?.avatar_url;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full nexo-header-glass">
      <div className="nexo-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link ref={logoRef} to="/" className="flex items-center space-x-2 group">
              <img 
                src="/nexo-logo.png" 
                alt="NEXO Logo" 
                className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
            
            <nav ref={navRef} className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                item.isLink ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="nexo-link hover-lift flex items-center gap-2"
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="nexo-link hover-lift flex items-center gap-2"
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.name}
                  </a>
                )
              ))}
            </nav>
          </div>

          <div ref={actionsRef} className="flex items-center gap-4">
            <a 
              href="https://github.com/NexoEngine/game-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
              <AnimatedButton variant="outline" size="sm" magneticStrength={0.2}>
                <Github className="mr-2 h-4 w-4" />
                Star
              </AnimatedButton>
            </a>
            
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover-lift">
                      <Avatar className="h-8 w-8 ring-2 ring-nexo-blue/20 hover:ring-nexo-blue/40 transition-all">
                        <AvatarImage src={avatarUrl} alt={displayName || 'User'} />
                        <AvatarFallback className="bg-nexo-blue text-white text-sm">
                          {getInitials(displayName)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-nexo-darkBlue border-nexo-blue/20">
                    {/* {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/blog/new" className="flex items-center cursor-pointer hover:bg-nexo-blue/10">
                          <Plus className="mr-2 h-4 w-4" />
                          New Post
                        </Link>
                      </DropdownMenuItem>
                    )} */}
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="flex items-center cursor-pointer hover:bg-nexo-blue/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <AnimatedButton variant="default" size="sm" magneticStrength={0.2} asChild>
                  <Link to="/auth">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </AnimatedButton>
              )
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover-lift"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden py-4 space-y-2 overflow-hidden">
            {navigation.map((item) => (
              item.isLink ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 nexo-link hover:bg-nexo-darkBlue/50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block px-4 py-2 nexo-link hover:bg-nexo-darkBlue/50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default AnimatedHeader;