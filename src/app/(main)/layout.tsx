import '@/styles/index';
import { Poppins } from 'next/font/google';
import Footer from '@/components/footer';
import NavbarPc from '@/components/navbar/navbarPc';
import NavbarMobile from '@/components/navbar/navbarMobile';
import ToTopButton from '@/components/ui/util/toTop/ToTopButton';
import Hero from '@/components/hero';
import ProfileWidget from '@/components/profile/profile';
import { ScreenSize } from '@/components/ui/util/screen';
import { MetaData } from '@/components/meta/metadata';
import Preloader from '@/components/ui/preloader/preloader';

const env = process.env;
const isDev = env.NEXT_PUBLIC_ENV === 'dev';

export const metadata = MetaData;

const poppins = Poppins({
    subsets: ['latin'],
    weight: "400",
});

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    // const prodCSP = `default-src 'self';
    //                 script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.cloudflare.com;
    //                 style-src 'self' 'unsafe-inline';
    //                 font-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com;
    //                 img-src 'self' data: https://lh3.googleusercontent.com https:;
    //                 connect-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com https://localhost http://localhost;
    //                 frame-src 'self' https://challenges.cloudflare.com https://www.google.com;`;

    // const devCSP = `default-src 'self' http: https: 'unsafe-inline';
    //                 script-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:3000 ws://localhost:3000 https://challenges.cloudflare.com https://*.cloudflare.com;
    //                 connect-src 'self' ws://localhost:3000 http://localhost:3000 https://localhost http://localhost https://challenges.cloudflare.com https://*.cloudflare.com;
    //                 font-src 'self' https://challenges.cloudflare.com data:;
    //                 img-src 'self' data: https://lh3.googleusercontent.com https:;
    //                 frame-src 'self' https://challenges.cloudflare.com https://www.google.com;
    //                 style-src 'self' 'unsafe-inline';`;
    // const csp = isDev ? devCSP : prodCSP;

    return (
        <html lang="en">
            {/* <head>
                <meta httpEquiv="Content-Security-Policy" content={csp} />
                <link rel="preconnect" href="https://challenges.cloudflare.com"></link>
            </head> */}
            <body className={`${poppins.className}`}>
                <Preloader />
                <main>
                    <div className="select-none">
                        <NavbarPc />
                        <NavbarMobile />
                        <ProfileWidget />
                        <Hero />
                    </div>
                    <div className="bg-bg overflow-x-hidden">
                        <div className="container m-auto lg:py-20 py-10">
                            {children}
                        </div>
                    </div>
                    <div className="select-none">
                        <Footer />
                        <ToTopButton />
                    </div>
                </main>
                {isDev && <ScreenSize />}
            </body>
        </html >
    );
}