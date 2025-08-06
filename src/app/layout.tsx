import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/libs/constant';
import { fonts } from '@/libs/fonts';
import { cn } from '@/libs/utils';

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.url()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords(),
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  verification: {
    google: siteConfig.googleSiteVerificationId(),
  },
  openGraph: {
    url: siteConfig.url(),
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: '/opengraph-image.png',
    type: 'website',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: '/opengraph-image.png',
  },
});

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <html lang={'en'} suppressHydrationWarning>
        <body className={cn('min-h-screen font-sans', fonts)}>
          <ThemeProvider attribute="class">
            <Navbar />
            {children}
            <ThemeSwitcher className="fixed bottom-5 right-5 z-10" />
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
