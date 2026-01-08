import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import AboutSection from '@/components/sections/about-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/layout/footer';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '../../../i18n-config';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection dictionary={dictionary} lang={lang} />
        <AboutSection dictionary={dictionary} />
        <ProjectsSection dictionary={dictionary} lang={lang} />
        <ContactSection dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </div>
  );
}
