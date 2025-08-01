import type { Metadata } from 'next';
import ClientLayout from './client-layout';

const host = process.env.NEXT_PUBLIC_BASE_URL;

const title = 'Torneo Voley Mixto';
const description =
  'WebApp para visualizar posiciones, fechas y campeones del torneo de voley mixto de la ciudad de La Plata';

export const metadata: Metadata = {
  title: {
      default: title,
      template: `%s | ${title}`,
    },
  description: description,
  openGraph: {
    title: title,
    description: description,
    images: [
      {
        url: `${host}/og-image.png`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'es_AR',
    siteName: title,
    url: host,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [`${host}/og-image.png`],
  },
};

const websiteData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Torneo Voley Mixto de La Plata',
  alternateName: 'Mixto La Plata',
  url: host,
};

const eventData = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Torneo Voley Mixto de La Plata',
  description:
    'WebApp para visualizar posiciones, fechas y campeones del torneo de voley mixto de la ciudad de La Plata',
  sport: 'Volleyball',
  location: {
    '@type': 'Place',
    name: 'La Plata',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'La Plata',
      addressCountry: 'AR',
    },
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'La Plata',
    },
    {
      '@type': 'City',
      name: 'Ensenada',
    },
    {
      '@type': 'City',
      name: 'Berisso',
    },
  ],
  url: host,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteData).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventData).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
