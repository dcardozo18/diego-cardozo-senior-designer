'use client';

import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Mail, Code2, Sun, Moon, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from 'next/navigation';

const navLinks = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const navLinkIds = navLinks.map(link => link.href.substring(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
             if (navLinkIds.includes(entry.target.id)) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLocaleChange = (locale: string) => {
    router.push(pathname.replace(/^\/(en|es)/, `/${locale}`));
  };

  const LanguageSwitcher = () => {
    if (!mounted) return null;
    return (
      <DropdownMenu>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/20 hover:text-primary">
                  <Languages className="h-6 w-6" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card text-foreground border-border">
              <p>Change Language</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent side="right" className="bg-card text-foreground border-border">
          <DropdownMenuItem onClick={() => handleLocaleChange('en')}>English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLocaleChange('es')}>Español</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const ThemeToggle = () => {
    if (!mounted) {
      return (
        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" disabled>
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      );
    }
    return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card text-foreground border-border">
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    );
  };

  const NavItems = () => (
    <nav className="flex flex-col items-center gap-4">
      {navLinks.map((link) => (
        <TooltipProvider key={link.href} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full h-12 w-12 transition-all duration-300",
                  activeSection === link.href.substring(1)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-primary/20 hover:text-primary'
                )}
                asChild
              >
                <a href={link.href} onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
                  <link.icon className="h-6 w-6" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card text-foreground border-border">
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col items-center justify-between w-28 h-screen fixed top-0 left-0 bg-card border-r py-8 z-50">
        <a href="#home" className="flex items-center gap-2" aria-label="Back to top">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <Code2 className="h-8 w-8" />
          </div>
        </a>
        <div className="flex flex-col items-center gap-6">
          <NavItems />
        </div>
        <div className="flex flex-col items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t p-2 z-50">
         <div className="flex justify-around items-center">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full h-12 w-12",
                  activeSection === link.href.substring(1)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
                asChild
              >
                <a href={link.href}>
                  <link.icon className="h-6 w-6" />
                </a>
              </Button>
            ))}
            { mounted && (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-muted-foreground">
                  <Languages className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="bg-card text-foreground border-border mb-2">
                <DropdownMenuItem onClick={() => handleLocaleChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLocaleChange('es')}>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )}
            { mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-12 w-12 text-muted-foreground"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
         </div>
      </div>
    </>
  );
};

export default Sidebar;
