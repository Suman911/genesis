const siteUrl = process.env.NEXT_PUBLIC_URL;
console.log('Generating site map for: ', siteUrl);
if (!siteUrl) {
    throw new Error('❌ NEXT_PUBLIC_URL is not defined in .env');
}
const config = {
    siteUrl: siteUrl,
    generateRobotsTxt: true,
    outDir: './out',
    changefreq: 'monthly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/test', '/test/*', '/admin', '/admin/*', '/api', '/api/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/admin/*', '/api', '/api/*'],
            },
        ],
    },
    transform: async (config, path) => {
        console.log('Path:', path);
        const custom = {
            '/': { priority: 1.0 },
            '/auth/login': { priority: 0.0 },
            '/story': { priority: 0.9 },
            '/gallery': { priority: 0.8 },
        };
        return {
            loc: path,
            changefreq: custom[path]?.changefreq || config.changefreq,
            priority: custom[path]?.priority || config.priority,
            lastmod: new Date().toISOString(),
        };
    },
};
module.exports = config;
