import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import AboutSection from '@/components/sections/about-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/layout/footer';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '../../../i18n-config';
import { getProjects, Project } from '@/lib/placeholder-images';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  
  const placeholderProjects = await getProjects(lang);
  
  // These scores are added for the AI to have something to work with.
  // In a real app, this data might come from an analytics service.
  const mockProjects: Project[] = placeholderProjects.map((p) => ({
    ...p,
    engagementScore: Math.floor(Math.random() * (95 - 70 + 1) + 70),
    visualAppealScore: Math.floor(Math.random() * (98 - 75 + 1) + 75),
  }));

  // Sort projects by scores as a reliable fallback instead of calling AI on every load.
  const arrangedProjects = [...mockProjects].sort((a, b) => 
    (b.engagementScore! + b.visualAppealScore!) - (a.engagementScore! + a.visualAppealScore!)
  );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection dictionary={dictionary} lang={lang} />
        <AboutSection dictionary={dictionary} />
        <ProjectsSection dictionary={dictionary} lang={lang} arrangedProjects={arrangedProjects} />
        <ContactSection dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </div>
  );
}
