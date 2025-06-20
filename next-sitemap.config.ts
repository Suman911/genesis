import type { IConfig } from 'next-sitemap';

const siteUrl = process.env.NEXT_PUBLIC_URL;

if (!siteUrl) {
  throw new Error('❌ NEXT_PUBLIC_URL is not defined in .env');
}

const config: IConfig = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: './out',
  sitemapSize: 5000,
  exclude: ['/admin/', '/api/'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
  },
};

export default config;
