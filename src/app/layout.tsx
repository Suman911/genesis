import '../styles/index.tsx';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer';
import ToTopButton from '@/components/ui/util/ToTopButton';
import Hero from '@/components/hero';

const poppins = Poppins({
  subsets: ['latin'],
  weight: "200",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Navbar />
        <Hero/>
        {children}
        <Footer />
        <ToTopButton />
      </body>
    </html>
  );
}