import React, { useState } from 'react';
import { Menu, X, Github, LogIn, LogOut, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  
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
    <header className="sticky top-0 z-50 w-full border-b border-nexo-darkBlue/50 bg-nexo-black/80 backdrop-blur-lg">
      <nav className="nexo-container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://raw.githubusercontent.com/NexoEngine/assets/refs/heads/main/logo_nexo.png" 
              alt="NEXO Logo" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg tracking-tight">NEXO</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => {
            const commonProps = {
              className: cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-nexo-blue",
                item.icon ? "inline-flex items-center gap-1" : ""
              ),
              target: item.href.startsWith('http') ? '_blank' : undefined,
              rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
            };

            return item.isLink ? (
              <Link key={item.name} to={item.href} {...commonProps}>
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ) : (
              <a key={item.name} href={item.href} {...commonProps}>
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </a>
            );
          })}

          {!loading && (
            <div className="ml-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl || undefined} alt={displayName || 'User'} />
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 nexo-btn-outline">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Create</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => navigate('/blog/create')}>
                        Create Blog Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="outline" size="sm" onClick={handleSignOut} className="nexo-btn-outline">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => navigate('/auth')} className="nexo-btn-outline">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center md:hidden">
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

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 pt-2 pb-3 border-t border-nexo-darkBlue/50 bg-nexo-black/95 backdrop-blur-lg">
            {navigation.map((item) => {
              const commonProps: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
                className: cn(
                  "flex items-center rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-nexo-blue/10 hover:text-nexo-blue w-full text-left",
                  item.icon ? "gap-2" : ""
                ),
                onClick: () => {
                  if (item.isLink && item.href) {
                    navigate(item.href);
                  }
                  setMobileMenuOpen(false);
                },
              };
              if (item.href.startsWith('http')) {
                (commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>).target = '_blank';
                (commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>).rel = 'noopener noreferrer';
              }

              return item.isLink ? (
                <button key={item.name} {...commonProps as React.ButtonHTMLAttributes<HTMLButtonElement>}>
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                </button>
              ) : (
                <a key={item.name} href={item.href} {...commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>}>
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                </a>
              );
            })}

            <div className="border-t border-nexo-darkBlue/50 pt-4">
              {!loading && (
                user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl || undefined} alt={displayName || 'User'} />
                        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-white">{displayName || 'User'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground hover:text-nexo-blue">
                            <Plus className="h-5 w-5" />
                            <span className="sr-only">Create</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => { navigate('/blog/create'); setMobileMenuOpen(false); }}>
                            Create Blog Post
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button variant="ghost" size="sm" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="text-muted-foreground hover:text-nexo-blue">
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full nexo-btn-outline" onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
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
