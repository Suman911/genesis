import '@/styles/index';
import { Poppins } from 'next/font/google';
import { ScreenSize } from '@/components/ui/util/screen';
import { MetaData } from '@/components/meta/metadata';
import ToTopButton from '@/components/ui/util/toTop/ToTopButton';
import IsAdmin from '@/components/admin/isAdmin';
import AdminNav from '@/components/navbar/adminNav';

const env = process.env;
const isDev = env.NEXT_PUBLIC_ENV === 'dev';

export const metadata = MetaData;

const poppins = Poppins({
  subsets: ['latin'],
  weight: "400",
});

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <main>
          <IsAdmin>
            <div className="flex min-h-screen bg-bg text-gray-800">
              <aside className="w-64 bg-white shadow-md h-screen sticky top-0 hidden md:block">
                <AdminNav />
              </aside>
              <div className="flex-1">
                <div className="bg-bg overflow-x-hidden">
                  <div className="container m-auto">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </IsAdmin>
          <div className="select-none">
            <ToTopButton />
          </div>
        </main>
        {isDev && <ScreenSize />}
      </body>
    </html>
  );
}