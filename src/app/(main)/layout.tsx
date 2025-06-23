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
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Preloader/>
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