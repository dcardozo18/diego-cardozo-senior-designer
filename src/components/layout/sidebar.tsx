'use client';

import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Mail, Code2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Locale } from '../../../i18n-config';
import Image from 'next/image';

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
    
    const targetLocale = lang === 'en' ? 'es' : 'en';
    const flagSrc = lang === 'en' ? '/es.png' : '/en.png';

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/20 hover:text-primary flex items-center justify-center"
              onClick={() => handleLocaleChange(targetLocale)}
            >
              <Image src={flagSrc} alt={dictionary.nav.change_language} width={24} height={24} />
              <span className="sr-only">{dictionary.nav.change_language}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-card text-foreground border-border">
            <p>{dictionary.nav.change_language}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-12 w-12 text-muted-foreground flex items-center justify-center"
                onClick={() => handleLocaleChange(lang === 'en' ? 'es' : 'en')}
              >
                <Image src={lang === 'en' ? '/es.png' : '/en.png'} alt={dictionary.nav.change_language} width={20} height={20} />
              </Button>
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
