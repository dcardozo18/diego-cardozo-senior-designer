'use client';

import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Mail, Code2, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { Locale } from '../../../i18n-config';
import Link from 'next/link';


const UsaFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 48" {...props}>
        <path fill="#C1272D" d="M0 0h72v48H0z" />
        <path fill="#FFF" d="M0 4h72v4H0zm0 8h72v4H0zm0 8h72v4H0zm0 8h72v4H0zm0 8h72v4H0zm0 8h72v4H0z" />
        <path fill="#002868" d="M0 0h36v28H0z" />
        <path
            fill="#FFF"
            d="M5 2.5l.9 2.8H9l-2.3 1.7.9 2.8L5 8.1l-2.5 1.7.9-2.8L1 5.3h3.2zm6 0l.9 2.8H15l-2.3 1.7.9 2.8L11 8.1l-2.5 1.7.9-2.8L7 5.3h3.2zm6 0l.9 2.8H21l-2.3 1.7.9 2.8L17 8.1l-2.5 1.7.9-2.8L13 5.3h3.2zm6 0l.9 2.8H27l-2.3 1.7.9 2.8L23 8.1l-2.5 1.7.9-2.8L19 5.3h3.2zm6 0l.9 2.8H33l-2.3 1.7.9 2.8L29 8.1l-2.5 1.7.9-2.8L25 5.3h3.2zm-27 5l.9 2.8H9l-2.3 1.7.9 2.8L5 13.1l-2.5 1.7.9-2.8L1 10.3h3.2zm6 0l.9 2.8H15l-2.3 1.7.9 2.8L11 13.1l-2.5 1.7.9-2.8L7 10.3h3.2zm6 0l.9 2.8H21l-2.3 1.7.9 2.8L17 13.1l-2.5 1.7.9-2.8L13 10.3h3.2zm6 0l.9 2.8H27l-2.3 1.7.9 2.8L23 13.1l-2.5 1.7.9-2.8L19 10.3h3.2zm6 0l.9 2.8H33l-2.3 1.7.9 2.8L29 13.1l-2.5 1.7.9-2.8L25 10.3h3.2zM5 12.5l.9 2.8H9l-2.3 1.7.9 2.8L5 18.1l-2.5 1.7.9-2.8L1 15.3h3.2zm6 0l.9 2.8H15l-2.3 1.7.9 2.8L11 18.1l-2.5 1.7.9-2.8L7 15.3h3.2zm6 0l.9 2.8H21l-2.3 1.7.9 2.8L17 18.1l-2.5 1.7.9-2.8L13 15.3h3.2zm6 0l.9 2.8H27l-2.3 1.7.9 2.8L23 18.1l-2.5 1.7.9-2.8L19 15.3h3.2zm6 0l.9 2.8H33l-2.3 1.7.9 2.8L29 18.1l-2.5 1.7.9-2.8L25 15.3h3.2zm-27 5l.9 2.8H9l-2.3 1.7.9 2.8L5 23.1l-2.5 1.7.9-2.8L1 20.3h3.2zm6 0l.9 2.8H15l-2.3 1.7.9 2.8L11 23.1l-2.5 1.7.9-2.8L7 20.3h3.2zm6 0l.9 2.8H21l-2.3 1.7.9 2.8L17 23.1l-2.5 1.7.9-2.8L13 20.3h3.2zm6 0l.9 2.8H27l-2.3 1.7.9 2.8L23 23.1l-2.5 1.7.9-2.8L19 20.3h3.2zm6 0l.9 2.8H33l-2.3 1.7.9 2.8L29 23.1l-2.5 1.7.9-2.8L25 20.3h3.2z"
        />
    </svg>
);

const SpainFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 48" {...props}>
        <path fill="#C60B1E" d="M0 0h72v48H0z" />
        <path fill="#FFC400" d="M0 12h72v24H0z" />
        <g transform="translate(18 18) scale(.6)">
            <path fill="#C60B1E" d="M6 0v24h12V0H6zm1 1h10v22H7V1zm8.5 4.5l-2 3-2-3h4z" />
            <path fill="#FFC400" d="M0 0v24h6v-9h12v9h6V0h-6v9H6V0H0zm9 13h6v2H9v-2zm0-4h6v2H9V9z" />
        </g>
    </svg>
);


const Sidebar = ({ dictionary, lang }: { dictionary: any, lang: Locale }) => {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  const LanguageSwitcher = () => {
    if (!mounted) return null;
    
    const targetLocale = lang === 'en' ? 'es' : 'en';
    const FlagIcon = lang === 'en' ? SpainFlagIcon : UsaFlagIcon;

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/20 hover:text-primary flex items-center justify-center"
              asChild
            >
              <Link href={`/${targetLocale}`} locale={targetLocale}>
                 <FlagIcon className="h-6 w-6" />
                <span className="sr-only">{dictionary.nav.change_language}</span>
              </Link>
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
                asChild
              >
                 <Link href={`/${lang === 'en' ? 'es' : 'en'}`} locale={lang === 'en' ? 'es' : 'en'}>
                    {lang === 'en' ? <SpainFlagIcon className="h-5 w-5" /> : <UsaFlagIcon className="h-5 w-5" />}
                 </Link>
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

    