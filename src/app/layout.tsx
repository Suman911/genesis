import '../styles/index.tsx';
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer';
import NavbarPc from '@/components/navbar/navbarPc';
import NavbarMobile from '@/components/navbar/navbarMobile';
import ToTopButton from '@/components/ui/util/toTop/ToTopButton';
import Hero from '@/components/hero';

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
        <Hero />
        <div className="bg-bg">
          <div className="container m-auto lg:py-20 py-10">
            {children}
          </div>
        </div>
        <Footer />
        <ToTopButton />
      </body>
    </html>
  );
}