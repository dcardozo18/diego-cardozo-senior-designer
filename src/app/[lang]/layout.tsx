import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/layout/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import type { Locale } from '../../../i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.hero.greeting,
    description: dictionary.hero.subtitle,
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex">
        <Sidebar dictionary={dictionary} lang={params.lang} />
        <div className="flex-1 md:pl-28">{children}</div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
