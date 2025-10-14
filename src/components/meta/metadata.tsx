const env = process.env;

const url = env.NEXT_PUBLIC_URL || "";
const name = env.NEXT_PUBLIC_NAME;
const description = "Preserving Life Science on Planet Earth";

export const MetaData = {
    title: name,
    description: description,
    metadataBase: new URL(url),
    alternates: {
        canonical: new URL(url),
    },
    openGraph: {
        title: name,
        description: description,
        url: new URL(url),
        siteName: name,
        images: [
            {
                url: '/assets/images/og-image.jpg',
                width: 800,
                height: 600,
                alt: name,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_image',
        title: name,
        description: description,
        images: ['/assets/images/og-image.jpg'],
    },
    icons: {
        icon: '/assets/images/logo_main.png',
    },
    robots: {
        index: true,
        follow: true,
    },
};