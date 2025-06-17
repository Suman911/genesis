import '../styles/index.tsx';
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer';
import NavbarPc from '@/components/navbar/navbarPc';
import NavbarMobile from '@/components/navbar/navbarMobile';
import ToTopButton from '@/components/ui/util/toTop/ToTopButton';
import Hero from '@/components/hero';
import ProfileWidget from '@/components/profile/profile';
import { ScreenSize } from '@/components/ui/util/screen';

const env = process.env.NEXT_PUBLIC_ENV;

const poppins = Poppins({
  subsets: ['latin'],
  weight: "400",
});
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <NavbarPc />
        <NavbarMobile />
        <ProfileWidget />
        <Hero />
        <div className="bg-bg overflow-x-hidden">
          <div className="container m-auto lg:py-20 py-10">
            {children}
          </div>
        </div>
        <Footer />
        <ToTopButton />
        {env === 'dev' && <ScreenSize />}
      </body>
    </html>
  );
}