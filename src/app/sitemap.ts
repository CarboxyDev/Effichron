import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://effichron.carboxy.me',
      lastModified: new Date(),
    },
    {
      url: 'https://effichron.carboxy.me/timer',
      lastModified: new Date(),
    },
    {
      url: 'https://effichron.carboxy.me/tasks',
      lastModified: new Date(),
    },
    {
      url: 'https://effichron.carboxy.me/history',
      lastModified: new Date(),
    },
    {
      url: 'https://effichron.carboxy.me/sign-in',
      lastModified: new Date(),
    },
  ];
}
