import '../styles/index.tsx';
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer';
import NavbarPc from '@/components/navbar/navbarPc';
import NavbarMobile from '@/components/navbar/navbarMobile';
import ToTopButton from '@/components/ui/util/ToTopButton';
import Hero from '@/components/hero';

const poppins = Poppins({
  subsets: ['latin'],
  weight: "200",
});
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} mt-20`}>
        <NavbarPc />
        <NavbarMobile />
        <Hero/>
        {children}
        <Footer />
        <ToTopButton />
      </body>
    </html>
  );
}