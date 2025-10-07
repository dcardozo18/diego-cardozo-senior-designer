import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google'
import Sidebar from '@/components/layout/sidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Diego Cardozo – Senior Web & UI/UX Designer',
  description: 'Diego Cardozo – Senior Web & UI/UX Designer | WordPress · Figma · LATAM Remote',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("font-body antialiased", poppins.variable)}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 md:pl-28">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
