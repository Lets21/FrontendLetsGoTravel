// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Let's Go Travel | Premium Travel Agency in Ecuador",
  description:
    'Your premium travel agency in Ecuador, specializing in personalized travel experiences to South America, Europe, and beyond.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', type: 'image/x-icon' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-icon.png?v=2',
    shortcut: '/favicon.ico?v=2',
  },
  // manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          :root {
            --color-gold-50: #FFFBEBff;
            --color-gold-100: #FEF3C7ff;
            --color-gold-200: #FDE68Aff;
            --color-gold-300: #FCD34Dff;
            --color-gold-400: #FBBF24ff;
            --color-gold-500: #D4AF37;
            --color-gold-600: #B89B30;
            --color-gold-700: #9C8129;
            --color-gold-800: #806A22;
            --color-gold-900: #64531B;
          }
        `}</style>
      </head>
      <body className={cn(inter.className, 'min-h-screen bg-background antialiased')}>
        <SiteHeader />

        {/* Separador para compensar el header fijo (ajusta si hace falta) */}
        <div className="h-20 md:h-28" />

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}
