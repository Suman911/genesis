"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var siteUrl = process.env.NEXT_PUBLIC_URL;
if (!siteUrl) {
    throw new Error('❌ NEXT_PUBLIC_URL is not defined in .env');
}
var config = {
    siteUrl: siteUrl,
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
exports.default = config;
