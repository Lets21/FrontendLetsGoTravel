// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'] });

// === Ajusta si tu dominio cambia ===
const siteUrl = 'https://www.letsgotravelss.com.ec'; // con “ss”
const siteName = 'Lets Go Travel SS';
const siteDescription =
  'Tu agencia de viajes premium en Ecuador, especializada en experiencias personalizadas a Sudamérica, Europa y más allá.';

export const metadata: Metadata = {
  title: `${siteName} | Tu agencia de viajes premium en Ecuador`,
  description: siteDescription,
  metadataBase: new URL(siteUrl),

  // Favicons / App icons
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', type: 'image/x-icon' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png?v=2',
    shortcut: '/favicon.ico?v=2',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    locale: 'es_EC',
    images: [
      {
        url: '/og-image.png', // 1200x630 recomendado
        width: 1200,
        height: 630,
        alt: `${siteName} - Agencia de Viajes`,
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: ['/og-image.png'],
  },

  // Opcional: Robots/Indexación
  robots: {
    index: true,
    follow: true,
  },

  // Opcional: Alternates
  alternates: {
    canonical: siteUrl,
  },
  // manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD de Schema.org (TravelAgency)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.png`,
    description: siteDescription,
    sameAs: [
      // ajusta/añade tus redes reales
      'https://www.facebook.com/letsgotravelss',
      'https://www.instagram.com/letsgotravelss',
    ],
  };

  return (
    <html lang="es">
      <head>
        {/* Preconexiones sugeridas para rendimiento (opcional) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* JSON-LD: datos estructurados */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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

        {/* Separador para compensar el header fijo */}
        <div className="h-20 md:h-28" />

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}
