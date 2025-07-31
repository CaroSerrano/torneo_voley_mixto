import type { MetadataRoute } from 'next';

const url = process.env.NEXT_PUBLIC_BASE_URL!;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url,
      lastModified: new Date(),
    },
    {
      url: `${url}/posiciones`,
      lastModified: new Date(),
    },
    {
      url: `${url}/campeones`,
      lastModified: new Date(),
    },
    {
      url: `${url}/llaves`,
      lastModified: new Date(),
    },
  ];
}
