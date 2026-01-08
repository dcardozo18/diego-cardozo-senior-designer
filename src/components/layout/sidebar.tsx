'use client';

import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Mail, Code2, Sun, Moon, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { Locale } from '../../../i18n-config';

const UsaFlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 72 72">
    <path fill="#fcea2b" d="M12 12h48v48H12z"/>
    <path fill="#1e50a0" d="M12 12h24v24H12z"/>
    <path fill="#fff" d="M36 12h24v4H36zm0 8h24v4H36zM12 40h48v4H12zm0 8h48v4H12z"/>
    <path fill="#d22f27" d="M12 28h48v4H12zm0 8h48v4H12zm0 8h48v4H12z"/>
    <path fill="#fff" d="m15 15l-1 3l-3-1l2 2l-1 3l2-2l2 2l-1-3l2-2l-3 1zm10 0l-1 3l-3-1l2 2l-1 3l2-2l2 2l-1-3l2-2l-3 1zm-5 5l-1 3l-3-1l2 2l-1 3l2-2l2 2l-1-3l2-2l-3 1zm10 0l-1 3l-3-1l2 2l-1 3l2-2l2 2l-1-3l2-2l-3 1zm-5 5l-1 3l-3-1l2 2l-1 3l2-2l2 2l-1-3l2-2l-3 1z"/>
  </svg>
);

const SpainFlagIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 72 72">
    <path fill="#d22f27" d="M12 12h48v48H12z"/>
    <path fill="#fcea2b" d="M12 24h48v24H12z"/>
    <g fill="none" stroke="#f1b31c" stroke-miterlimit="10" stroke-width="2">
      <path d="M26 31.5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2"/>
      <path d="M30 35.5a2 2 0 0 1-2-2v-2h-4v2a2 2 0 0 1-2 2"/>
    </g>
    <path fill="#d22f27" d="M30 29.5h-4v-4h4z"/>
    <path fill="none" stroke="#f1b31c" stroke-miterlimit="10" stroke-width="2" d="M31 32.5h2m-10 0h2m7-10v-1m-8 1v-1"/>
  </svg>
);


const Sidebar = ({ dictionary, lang }: { dictionary: any, lang: Locale }) => {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '#home', label: dictionary.nav.home, icon: Home },
    { href: '#about', label: dictionary.nav.about, icon: User },
    { href: '#projects', label: dictionary.nav.projects, icon: Briefcase },
    { href: '#contact', label: dictionary.nav.contact, icon: Mail },
  ];

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
    const sectionsToObserve = Array.from(sections).filter(section => navLinkIds.includes(section.id));
    sectionsToObserve.forEach((section) => observer.observe(section));

    return () => {
      sectionsToObserve.forEach((section) => observer.unobserve(section));
    };
  }, [navLinks]);

  const handleLocaleChange = (locale: string) => {
    const newPath = `/${locale}`;
    window.location.href = newPath;
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
                  {lang === 'en' ? <UsaFlagIcon /> : <SpainFlagIcon />}
                  <span className="sr-only">{dictionary.nav.change_language}</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card text-foreground border-border">
              <p>{dictionary.nav.change_language}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent side="right" className="bg-card text-foreground border-border">
          {lang === 'en' ? (
            <DropdownMenuItem onClick={() => handleLocaleChange('es')}>{dictionary.languages.es}</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleLocaleChange('en')}>{dictionary.languages.en}</DropdownMenuItem>
          )}
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
          <span className="sr-only">{dictionary.nav.toggle_theme}</span>
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
                  <span className="sr-only">{dictionary.nav.toggle_theme}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card text-foreground border-border">
              <p>{dictionary.nav.toggle_theme}</p>
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
                <a href={link.href}>
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
                  {lang === 'en' ? <UsaFlagIcon /> : <SpainFlagIcon />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="bg-card text-foreground border-border mb-2">
                {lang === 'en' ? (
                  <DropdownMenuItem onClick={() => handleLocaleChange('es')}>{dictionary.languages.es}</DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => handleLocaleChange('en')}>{dictionary.languages.en}</DropdownMenuItem>
                )}
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
                <span className="sr-only">{dictionary.nav.toggle_theme}</span>
              </Button>
            )}
         </div>
      </div>
    </>
  );
};

export default Sidebar;
