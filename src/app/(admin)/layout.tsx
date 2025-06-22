import '@/styles/index';
import { Poppins } from 'next/font/google';
import { ScreenSize } from '@/components/ui/util/screen';

const env = process.env;
const isDev = env.NEXT_PUBLIC_ENV === 'dev';

const poppins = Poppins({
  subsets: ['latin'],
  weight: "400",
});

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <main>
          <div className="bg-bg overflow-x-hidden">
            <div className="container m-auto lg:py-20 py-10">
              {children}
            </div>
          </div>
        </main>
        {isDev && <ScreenSize />}
      </body>
    </html>
  );
}